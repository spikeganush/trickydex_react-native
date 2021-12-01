import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'
import logo from '../assets/adaptive-icon.png'

const Splash = () => {
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Signin')
    }, 3000)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to TrickyDex</Text>
      <Image source={logo} style={styles.logo} />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#1A73E9',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  logo: {
    width: 200,
    height: 200,
  },
})
