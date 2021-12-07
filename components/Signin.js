import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'

const Signin = (props) => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loginText, setLoginText] = useState('LOGIN')

  useEffect(() => {
    if (props.auth === true) {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
    }
  }, [props.auth])

  const handleSignin = () => {
    if (email === '' || password === '') {
      setError('Please fill all fields')
      setTimeout(() => {
        setError('')
      }, 3000)
    } else {
      setLoginText('LOGGING IN...')
      props.handler(email, password)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TrickyDex</Text>
      </View>
      <View style={styles.signinArea}>
        <Text style={styles.signinTitle}>Connect to your account</Text>
        <Text style={styles.error}>{error || props.error}</Text>
        <TextInput
          style={styles.signinInput}
          placeholder="Email address"
          placeholderTextColor="#757575"
          autoCapitalize="none"
          textContentType="emailAddress"
          autoComplete="email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.signinInput}
          placeholder="Password"
          placeholderTextColor="#757575"
          secureTextEntry={true}
          textContentType="password"
          autoComplete="password"
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.forgotArea}>
          <Text
            style={styles.forgotPassword}
            onPress={() => {
              navigation.navigate('ForgotPassword')
            }}
          >
            Forgot password?
          </Text>
        </View>
      </View>

      <View style={styles.signinButtonArea}>
        <TouchableOpacity
          style={[styles.buttons, styles.signinButton]}
          onPress={() => {
            handleSignin()
          }}
        >
          <Text style={styles.buttonText}>{loginText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, styles.signupButton]}
          onPress={() => {
            navigation.navigate('Signup')
          }}
        >
          <Text style={styles.buttonText}>CREATE AN ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Signin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
  },
  header: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    maxHeight: '20%',
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#1A73E9',
    paddingLeft: 15,
  },
  signinArea: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  signinTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 65,
  },
  signinInput: {
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
  signinButtonArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    maxHeight: '20%',
    marginTop: '20%',
  },
  buttons: {
    width: '70%',
    height: 40,
    marginBottom: 10,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signinButton: {
    backgroundColor: '#1DC7DE',
  },
  signupButton: {
    backgroundColor: '#1DDE7D',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    paddingTop: 8,
  },
  error: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 8,
  },
  forgotPassword: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A73E9',
  },
  forgotArea: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '70%',
  },
})
