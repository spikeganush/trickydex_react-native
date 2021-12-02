import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//components
import Splash from './components/Splash'
import Home from './components/Home'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Signout from './components/Signout'
import Slides from './components/Slides'
import Airs from './components/Airs'
import Grabs from './components/Grabs'
//firebase
import { firebaseConfig } from './Config'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

import {
  initializeFirestore,
  getFirestore,
  setDoc,
  doc,
  addDoc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore'

const FBapp = initializeApp(firebaseConfig)
const FSdb = initializeFirestore(FBapp, { useFetchStreams: false })
const FBauth = getAuth()

const Stack = createNativeStackNavigator()

export default function App() {
  const [auth, setAuth] = useState(true)
  const [user, setUser] = useState()
  const [signupError, setSignupError] = useState()
  const [signinError, setSigninError] = useState()
  const [tricks, setTricks] = useState([])
  const [slides, setSlides] = useState([])
  const [airs, setAirs] = useState([])
  const [grabs, setGrabs] = useState([])
  const [nbTricks, setNbTricks] = useState([])

  useEffect(() => {
    onAuthStateChanged(FBauth, (user) => {
      if (user) {
        setAuth(true)
        setUser(user)
        if (tricks.length === 0) {
          getTricks()
        }
        if (nbTricks.length === 0) {
          getNbTricks()
        }
        if (slides.length === 0) {
          getTricksPerCategory('Slide')
        }
        if (airs.length === 0) {
          getTricksPerCategory('Air')
        }
        if (grabs.length === 0) {
          getTricksPerCategory('Grab')
        }
      } else {
        setAuth(false)
        setUser(null)
      }
    })
  })

  const SignupHandler = (email, password, firstName, lastName) => {
    setSignupError(null)
    createUserWithEmailAndPassword(FBauth, email, password)
      .then(() => {
        setDoc(doc(FSdb, 'Users', FBauth.currentUser.uid), {
          email: email,
          firstname: firstName,
          lastname: lastName,
          Air: 0,
          Grab: 0,
          Slide: 0,
          admin: false,
          listDone: [], //list of tricks done
        })

        setUser(FBauth.currentUser.user)
        setAuth(true)
      })
      .catch((error) => {
        setSignupError(error.code)
      })
  }

  const SigninHandler = (email, password) => {
    signInWithEmailAndPassword(FBauth, email, password)
      .then(() => {
        setUser(FBauth.currentUser.user)
        setAuth(true)
        console.log(FBauth.currentUser.uid)
      })
      .catch((error) => {
        const message = error.code.includes('/')
          ? error.code.split('/')[1].replace(/-/g, ' ')
          : error.code
        setSigninError(message)
      })
  }

  const SignoutHandler = () => {
    signOut(FBauth)
      .then(() => {
        setAuth(false)
        setUser(null)
      })
      .catch((error) => console.log(error.code))
  }

  const getTricks = () => {
    // console.log('...getting data', tricks)
    const FSquery = query(collection(FSdb, 'Tricks'))
    const unsubscribe = onSnapshot(FSquery, (querySnapshot) => {
      let FSdata = []
      querySnapshot.forEach((doc) => {
        let item = {}
        item = doc.data()
        item.id = doc.id
        FSdata.push(item)
      })
      setTricks(FSdata)
    })
  }

  const getTricksPerCategory = (category) => {
    // console.log('...getting data', tricks)
    const FSquery = query(
      collection(FSdb, 'Tricks'),
      where('category', '==', category)
    )
    const unsubscribe = onSnapshot(FSquery, (querySnapshot) => {
      let FSdata = []
      querySnapshot.forEach((doc) => {
        let item = {}
        item = doc.data()
        item.id = doc.id
        FSdata.push(item)
      })
      if (category === 'Slide') {
        setSlides(FSdata)
      }
      if (category === 'Air') {
        setAirs(FSdata)
      }
      if (category === 'Grab') {
        setGrabs(FSdata)
      }
    })
  }

  const getNbTricks = () => {
    // console.log('...getting data', nbTricks)
    const FSquery = query(collection(FSdb, 'NbTricks'))
    const unsubscribe = onSnapshot(FSquery, (querySnapshot) => {
      let FSdata = []
      querySnapshot.forEach((doc) => {
        let item = {}
        item = doc.data()
        item.id = doc.id
        FSdata.push(item)
      })
      setNbTricks(FSdata)
    })
  }

  const getUserDetails = async (id) => {
    // console.log('...getting user details', id)
    const docRef = doc(FSdb, 'Users', id)
    const docData = await getDoc(docRef)
    return new Promise((resolve, reject) => {
      if (docData.exists()) {
        let document = docData.data()
        document.id = id
        resolve(document)
      } else {
        reject('no such document')
      }
    })
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
      // screenOptions={{
      //   headerShown: false,
      // }}
      >
        <Stack.Screen
          name="Splash"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <Splash {...props} auth={auth} />}
        </Stack.Screen>
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
            headerTitle: 'Home',
            headerRight: (props) => (
              <Signout {...props} handler={SignoutHandler} user={user} />
            ),
          }}
        >
          {(props) => (
            <Home
              {...props}
              user={user}
              tricks={tricks}
              nbTricks={nbTricks}
              auth={auth}
              getUserDetails={getUserDetails}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Signup"
          options={{
            headerTitle: 'Create Account',
          }}
        >
          {(props) => <Signup {...props} user={user} handler={SignupHandler} />}
        </Stack.Screen>
        <Stack.Screen
          name="Signin"
          options={{
            headerShown: false,
          }}
        >
          {(props) => (
            <Signin
              {...props}
              auth={auth}
              error={signinError}
              handler={SigninHandler}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Slides"
          options={{
            headerTitle: 'Slides',
            headerShown: true,
          }}
        >
          {(props) => (
            <Slides {...props} auth={auth} tricks={slides} user={user} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Airs"
          options={{
            headerTitle: 'Airs',
            headerShown: true,
          }}
        >
          {(props) => <Airs {...props} auth={auth} tricks={airs} user={user} />}
        </Stack.Screen>
        <Stack.Screen
          name="Grabs"
          options={{
            headerTitle: 'Grabs',
            headerShown: true,
          }}
        >
          {(props) => (
            <Grabs {...props} auth={auth} tricks={grabs} user={user} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
