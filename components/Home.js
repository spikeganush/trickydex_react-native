import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'

const Home = (props) => {
  const navigation = useNavigation()
  const [userDetails, setUserDetails] = useState()

  useEffect(() => {
    if (!props.auth) {
      navigation.reset({ index: 0, routes: [{ name: 'Signin' }] })
    }
  }, [props.auth])

  useEffect(() => {
    // console.log('Home.js: useEffect', props)
    if (userDetails === undefined) {
      props
        .getUserDetails(props.user.uid)
        .then((document) => setUserDetails(document))
        .catch((error) => console.log(error))
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TrickyDex</Text>
        <View style={styles.headerImage}>
          {props.user.imageUrl ? (
            <Image
              source={{ uri: props.user.imageUrl }}
              style={styles.avatar}
            />
          ) : (
            <Image
              source={require('../img/account.png')}
              style={styles.avatar}
            />
          )}
        </View>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    maxHeight: '20%',
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A73E9',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#E0DDCE',
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
