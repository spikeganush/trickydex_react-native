import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const sendEmail = () => {
    if (email === '') {
      setError('Please enter your email')

      setTimeout(() => {
        setError('')
      }, 3000)
    } else {
      props.onSubmit(email)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.success}>{props.success}</Text>
      <Text style={styles.error}>{error || props.error}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email to reset the password"
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          sendEmail()
        }}
      >
        <Text style={styles.buttonText}>RESET PASSWORD</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '70%',
    height: 40,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 6,
    backgroundColor: '#F1F1F1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    width: '70%',
    height: 40,
    borderRadius: 6,
    backgroundColor: '#1DC7DE',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    paddingTop: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  success: {
    color: 'green',
    fontSize: 16,
    marginBottom: 10,
  },
})
