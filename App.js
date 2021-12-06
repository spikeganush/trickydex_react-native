import { LogBox } from 'react-native'
LogBox.ignoreLogs(['Setting a timer'])
LogBox.ignoreLogs(['AsyncStorage'])

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
import Profile from './components/Profile'
import DetailsTricks from './components/DetailsTricks'
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
  setDoc,
  doc,
  addDoc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  deleteDoc,
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
  const [slides, setSlides] = useState([])
  const [airs, setAirs] = useState([])
  const [grabs, setGrabs] = useState([])

  useEffect(() => {
    onAuthStateChanged(FBauth, (user) => {
      if (user) {
        setAuth(true)
        setUser(user)
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
        setTimeout(() => {
          setSignupError('')
        }, 3000)
      })
  }

  const SigninHandler = (email, password) => {
    signInWithEmailAndPassword(FBauth, email, password)
      .then(() => {
        setUser(FBauth.currentUser.user)
        setAuth(true)
        // console.log(FBauth.currentUser.uid)
      })
      .catch((error) => {
        const message = error.code.includes('/')
          ? error.code.split('/')[1].replace(/-/g, ' ')
          : error.code
        setSigninError(message)
        setTimeout(() => {
          setSigninError('')
        }, 3000)
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

  const getNbSlidesDone = () => {
    let nbSlidesDone = 0
    slides.forEach((slide) => {
      nbSlidesDone++
    })
    return nbSlidesDone
  }

  const getNbAirsDone = () => {
    let nbAirsDone = 0
    airs.forEach((air) => {
      nbAirsDone++
    })
    return nbAirsDone
  }

  const getNbGrabsDone = () => {
    let nbGrabsDone = 0
    grabs.forEach((slide) => {
      nbGrabsDone++
    })
    return nbGrabsDone
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

  const addTrickListDone = async (userId, trickId, category) => {
    const docRef = doc(FSdb, 'Users', userId)
    category === 'Slide'
      ? await updateDoc(docRef, {
          listDone: arrayUnion(trickId),
          Slide: increment(1),
        })
      : category === 'Air'
      ? await updateDoc(docRef, {
          listDone: arrayUnion(trickId),
          Air: increment(1),
        })
      : await updateDoc(docRef, {
          listDone: arrayUnion(trickId),
          Grab: increment(1),
        })
  }

  const removeTrickListDone = async (userId, trickId, category) => {
    const docRef = doc(FSdb, 'Users', userId)
    category === 'Slide'
      ? await updateDoc(docRef, {
          listDone: arrayRemove(trickId),
          Slide: increment(-1),
        })
      : category === 'Air'
      ? await updateDoc(docRef, {
          listDone: arrayRemove(trickId),
          Air: increment(-1),
        })
      : await updateDoc(docRef, {
          listDone: arrayRemove(trickId),
          Grab: increment(-1),
        })
  }

  const addTricks = async (
    category,
    trickName,
    difficulty,
    trickDescriptions
  ) => {
    const query = await addDoc(collection(FSdb, 'Tricks'), {
      category: category,
      name: trickName,
      difficulty: difficulty,
      info: trickDescriptions,
      selected: false,
    })

    category === 'Slide'
      ? getTricksPerCategory('Slides')
      : category === 'Air'
      ? getTricksPerCategory('Airs')
      : getTricksPerCategory('Grabs')
  }

  const editTricks = async (
    id,
    category,
    trickName,
    difficulty,
    trickDescriptions
  ) => {
    const query = await updateDoc(doc(FSdb, 'Tricks', id), {
      category: category,
      name: trickName,
      difficulty: difficulty,
      info: trickDescriptions,
      selected: false,
    })
    console.log('id', id)
    console.log('category', category)
    console.log('trickName', trickName)
    console.log('difficulty', difficulty)
    console.log('trickDescriptions', trickDescriptions)

    category === 'Slide'
      ? getTricksPerCategory('Slides')
      : category === 'Air'
      ? getTricksPerCategory('Airs')
      : getTricksPerCategory('Grabs')
  }

  const deleteTricks = async (category, trickId) => {
    const query = await deleteDoc(doc(FSdb, 'Tricks', trickId))
    setTimeout(() => {
      getTricksPerCategory(category)
    }, 2000)
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
              auth={auth}
              getUserDetails={getUserDetails}
              getNbSlidesDone={getNbSlidesDone}
              getNbAirsDone={getNbAirsDone}
              getNbGrabsDone={getNbGrabsDone}
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
          name="Profile"
          options={{
            headerShown: true,
            headerTitle: 'Profile',
          }}
        >
          {(props) => (
            <Profile
              {...props}
              user={user}
              auth={auth}
              handler={SignoutHandler}
              getUserDetails={getUserDetails}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="DetailsTricks"
          options={{
            headerTitle: 'TrickyDex',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1A73E9',
            },
            headerShown: true,
          }}
        >
          {(props) => (
            <DetailsTricks
              {...props}
              auth={auth}
              slides={slides}
              airs={airs}
              grabs={grabs}
              user={user}
              getUserDetails={getUserDetails}
              addTrickListDone={addTrickListDone}
              removeTrickListDone={removeTrickListDone}
              addTricks={addTricks}
              deleteTrick={deleteTricks}
              editTricks={editTricks}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}
