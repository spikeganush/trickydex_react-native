import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native'
import emailLogo from '../img/email.png'
import firstNameLogo from '../img/perm_identity.png'
import lastNameLogo from '../img/account.png'
import passwordLogo from '../img/lock.png'

const Signup = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [firstNameHighlight, setFirstNameHighlight] = useState(false)
  const [lastNameHighlight, setLastNameHighlight] = useState(false)
  const [emailHighlight, setEmailHighlight] = useState(false)
  const [passwordHighlight, setPasswordHighlight] = useState(false)
  const [confirmPasswordHighlight, setConfirmPasswordHighlight] =
    useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={emailHighlight ? styles.inputFocused : styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            textContentType="emailAddress"
            autoComplete="email"
            onFocus={() => setEmailHighlight(true)}
            onBlur={() => setEmailHighlight(false)}
          />
          <Image source={emailLogo} style={styles.image} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={firstNameHighlight ? styles.inputFocused : styles.input}
            placeholder="First Name"
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
            textContentType="givenName"
            autoComplete="name-given"
            onFocus={() => setFirstNameHighlight(true)}
            onBlur={() => setFirstNameHighlight(false)}
          />
          <Image source={firstNameLogo} style={styles.image} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={lastNameHighlight ? styles.inputFocused : styles.input}
            placeholder="Last Name"
            onChangeText={(text) => setLastName(text)}
            value={lastName}
            textContentType="familyName"
            autoComplete="name-family"
            onFocus={() => setLastNameHighlight(true)}
            onBlur={() => setLastNameHighlight(false)}
          />
          <Image source={lastNameLogo} style={styles.image} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={passwordHighlight ? styles.inputFocused : styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            onFocus={() => setPasswordHighlight(true)}
            onBlur={() => setPasswordHighlight(false)}
          />
          <Image source={passwordLogo} style={styles.image} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={
              confirmPasswordHighlight ? styles.inputFocused : styles.input
            }
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={true}
            onFocus={() => setConfirmPasswordHighlight(true)}
            onBlur={() => setConfirmPasswordHighlight(false)}
          />
          <Image source={passwordLogo} style={styles.image} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.handler(email, password, firstName, lastName)
          }}
        >
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  inputsContainer: {
    flex: 1,
    width: '90%',
    marginTop: 30,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '90%',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  inputFocused: {
    width: '95%',
    borderBottomColor: '#1A73E9',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  image: {
    width: 32,
    height: 32,
  },
  buttonContainer: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '70%',
    height: 40,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: '#1DDE7D',
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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    paddingTop: 8,
  },
})
