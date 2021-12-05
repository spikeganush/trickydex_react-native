import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Profile = (props) => {
  const navigation = useNavigation()
  const [userDetails, setUserDetails] = useState()
  //   console.log('userDetails', userDetails)
  useEffect(() => {
    if (!props.auth) {
      navigation.reset({ index: 0, routes: [{ name: 'Signin' }] })
    }
  }, [props.auth])

  useEffect(() => {
    if (userDetails === undefined) {
      props
        .getUserDetails(props.user?.uid)
        .then((document) => setUserDetails(document))
        .catch((error) => console.log(error))
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.textDetails}>
        First name: {userDetails?.firstname}
      </Text>
      <Text style={styles.textDetails}>Last name: {userDetails?.lastname}</Text>
      <Text style={styles.textDetails}>Email: {userDetails?.email}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => props.handler()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textDetails: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#DADADA',
    padding: 10,
    borderRadius: 5,
    width: 110,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
