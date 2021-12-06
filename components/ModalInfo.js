import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native'
import { useRoute } from '@react-navigation/native'
1
import Slider from '@react-native-community/slider'

const ModalInfo = (props) => {
  return (
    <Modal
      animationType="fade"
      visible={props.modalInfoVisible}
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <View style={styles.modalHeaderLeftPart}>
            <Text style={styles.modalTitle}>{props.nameTrick}</Text>
          </View>
          <Text
            style={styles.closeModal}
            onPress={() => props.setmodalInfoVisible(false)}
          >
            X
          </Text>
        </View>
        <ScrollView>
          <Text style={styles.modalDescription}>{props.descriptionTrick}</Text>
        </ScrollView>
      </View>
    </Modal>
  )
}

export default ModalInfo

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 40,
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
  closeModal: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  modalDescription: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    marginBottom: 10,
  },
})
