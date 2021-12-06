import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'

const ModalDelete = (props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalDeleteVisible}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.text}>Delete {props.nameTrick}?</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              props.deleteTrick(props.categoryTrick, props.idTrick)
              props.setmodalDeleteVisible(false)
            }}
          >
            <Text style={[styles.button, styles.buttonYes]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.setmodalDeleteVisible(false)}>
            <Text style={[styles.button, styles.buttonCancel]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default ModalDelete

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 80,
    marginVertical: 250,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 15,
  },
  buttonYes: {
    backgroundColor: '#1DDE7D',
  },
  buttonCancel: {
    backgroundColor: '#F1F1F1',
  },
})
