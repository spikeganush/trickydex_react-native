import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native'

import Slider from '@react-native-community/slider'

const ModalAdd = (props) => {
  const [nameAdd, setNameAdd] = useState()
  const [descriptionAdd, setDescriptionAdd] = useState()
  const [addDifficulty, setAddDifficulty] = useState(0)
  const [error, setError] = useState('')

  const runAddTrick = (category, name, difficulty, description) => {
    if (
      name === undefined ||
      name === '' ||
      description === undefined ||
      description === '' ||
      difficulty === 0
    ) {
      setError('Please fill all the fields')
      setTimeout(() => {
        setError('')
      }, 3000)
    } else {
      props.addTricks(category, name, difficulty, description)
      props.setmodalAddVisible(false)
      setNameAdd('')
      setDescriptionAdd('')
      setAddDifficulty(0)
    }
  }

  return (
    <Modal
      animationType="fade"
      visible={props.modalAddVisible}
      transparent={true}
    >
      <View style={styles.modalAddContainer}>
        <View style={styles.modalHeader}>
          <View style={styles.modalHeaderLeftPart}>
            <Text style={styles.modalTitle}>Add {props.categoryTrick}</Text>
          </View>
          <Text
            style={styles.closeModal}
            onPress={() => props.setmodalAddVisible(false)}
          >
            X
          </Text>
        </View>
        <Text style={styles.modalAddError}>{error}</Text>
        <Text style={styles.modalAddName}>{props.categoryTrick} Name</Text>
        <TextInput
          style={styles.modalAddNameInput}
          onChangeText={(text) => setNameAdd(text)}
        />
        <Text style={styles.modalAddSlideText}>
          {props.categoryTrick} difficulty: {addDifficulty}
        </Text>

        <Slider
          value={addDifficulty}
          onValueChange={(value) => setAddDifficulty(value)}
          step={1}
          minimumValue={0}
          maximumValue={5}
          style={{ width: '90%', height: 40 }}
        />
        <Text style={styles.modalAddName}>
          {props.categoryTrick} information
        </Text>
        <TextInput
          style={styles.modalAddInfoInput}
          multiline
          editable
          maxLength={1000}
          onChangeText={(text) => setDescriptionAdd(text)}
        />
        <View style={styles.modalButtonArea}>
          <TouchableOpacity
            style={[
              styles.modalButton,
              props.categoryTrick === 'Slide'
                ? styles.containerCardListSlideBg
                : props.categoryTrick === 'Air'
                ? styles.containerCardListAirBg
                : styles.containerCardListGrabBg,
            ]}
            onPress={() => {
              runAddTrick(
                props.categoryTrick,
                nameAdd,
                addDifficulty,
                descriptionAdd
              )
            }}
          >
            <Text style={styles.modalButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default ModalAdd

const styles = StyleSheet.create({
  modalAddContainer: {
    margin: 40,
    height: 580,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  modalHeaderLeftPart: {
    alignItems: 'center',
    width: '90%',
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
  },
  modalAddName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  modalAddNameInput: {
    width: '100%',
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#F1F1F1',
    padding: 15,
  },
  modalAddInfoInput: {
    width: '100%',
    height: 180,
    borderColor: '#000',
    borderWidth: 1,
    textAlignVertical: 'top',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#F1F1F1',
    padding: 15,
  },
  modalButtonArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
  },
  modalButton: {
    width: 180,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  modalAddDifficultyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  containerCardListSlideBg: {
    backgroundColor: '#FA6767',
  },
  containerCardListAirBg: {
    backgroundColor: '#67FAA2',
  },
  containerCardListGrabBg: {
    backgroundColor: '#67A2FA',
  },
  modalAddError: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
})
