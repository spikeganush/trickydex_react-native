import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { View, Text } from 'react-native'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home')
    }, 2000)
  }, [])

  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})
