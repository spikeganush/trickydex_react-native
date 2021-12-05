import React, { useEffect, useState } from 'react'
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native'
import { useRoute } from '@react-navigation/native'

const DetailsTricks = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const route = useRoute()
  const [slides, setSlides] = useState([])
  const [airs, setAirs] = useState([])
  const [grabs, setGrabs] = useState([])
  const [category, setCategory] = useState()
  const [userDetails, setUserDetails] = useState()

  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [modalId, setModalId] = useState()

  useEffect(() => {
    if (slides.length === 0) {
      setSlides(props.slides)
    }
    if (airs.length === 0) {
      setAirs(props.airs)
    }
    if (grabs.length === 0) {
      setGrabs(props.grabs)
    }
    setCategory(route.params)
  }, [route.params, slides, airs, grabs])

  useEffect(() => {
    if (userDetails === undefined) {
      getDataUser()
    }
  }, [userDetails])

  const getDataUser = () => {
    props
      .getUserDetails(props.user?.uid)
      .then((document) => setUserDetails(document))
      .catch((error) => console.log(error))
  }

  const renderItem = ({ item }) => {
    // console.log(item)
    return (
      <View
        style={[
          styles.containerCardList,
          category.category === 'Slides'
            ? styles.containerCardListSlideBg
            : category.category === 'Airs'
            ? styles.containerCardListAirBg
            : styles.containerCardListGrabBg,
        ]}
      >
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.buttonPlusRightPart}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalVisible(true)
            }}
          >
            <View style={styles.buttonInfo}>
              <Text style={styles.buttonText}>i</Text>
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.rightPart,
              category.category === 'Slides'
                ? styles.rightPartSlideBg
                : category.category === 'Airs'
                ? styles.rightPartAirBg
                : styles.rightPartGrabBg,
            ]}
          >
            {userDetails !== undefined && userDetails.listDone.includes(item.id)
              ? (item.selected = true)
              : (item.selected = false)}
            <TouchableOpacity
              style={[
                styles.checkBoxButton,
                item.selected
                  ? styles.checkBoxButtonSelected
                  : category.category === 'Slides'
                  ? styles.checkBoxButtonSlideBg
                  : category.category === 'Airs'
                  ? styles.checkBoxButtonAirBg
                  : styles.checkBoxButtonGrabBg,
              ]}
              onPress={() => {
                item.selected
                  ? (props.removeTrickListDone(
                      userDetails.id,
                      item.id,
                      item.category
                    ),
                    getDataUser())
                  : (props.addTrickListDone(
                      userDetails.id,
                      item.id,
                      item.category
                    ),
                    getDataUser())
              }}
            />
          </View>
        </View>
      </View>
    )
  }

  if (
    slides.length > 0 ||
    airs.length > 0 ||
    (grabs.length > 0 && category !== undefined)
  ) {
    // console.log('Category:', category.category)
    return (
      <View style={styles.container}>
        <Modal
          style={styles.modal}
          animationType="slide"
          visible={modalVisible}
        >
          <View style={styles.modalContainer}>
            {category.category === 'Slides'
              ? slides.map((slide) => {
                  if (slide.id === modalId) {
                    setName(slide.name)
                    setDescription(slide.info)
                  }
                })
              : category.category === 'Airs'
              ? airs.map((air) => {
                  if (air.id === modalId) {
                    setName(air.name)
                    setDescription(air.info)
                  }
                })
              : grabs.map((grab) => {
                  if (grab.id === modalId) {
                    setName(grab.name)
                    setDescription(grab.info)
                  }
                })}

            <Text style={styles.modalTitle}>{name}</Text>
            <Text style={styles.modalDescription}>{description}</Text>
          </View>
        </Modal>
        <FlatList
          data={
            category.category === 'Slides'
              ? slides
              : category.category === 'Airs'
              ? airs
              : grabs
          }
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  } else return null
}

export default DetailsTricks

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  containerCardList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
    borderRadius: 10,
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
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonInfo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: '#000',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingBottom: 5,
  },
  buttonPlusRightPart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  rightPart: {
    flexDirection: 'row',
    height: '100%',
    width: 85,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    marginLeft: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightPartSlideBg: {
    backgroundColor: '#FF9F9F',
  },
  rightPartAirBg: {
    backgroundColor: '#BFFBE5',
  },
  rightPartGrabBg: {
    backgroundColor: '#BFE2FB',
  },
  checkBoxButton: {
    backgroundColor: '#FF9F9F',
    borderColor: '#000',
    borderWidth: 1,
    width: 25,
    height: 25,
    borderRadius: 5,
  },
  checkBoxButtonSlideBg: {
    backgroundColor: '#FF9F9F',
  },
  checkBoxButtonAirBg: {
    backgroundColor: '#BFFBE5',
  },
  checkBoxButtonGrabBg: {
    backgroundColor: '#BFE2FB',
  },
  checkBoxButtonSelected: {
    backgroundColor: '#67FA76',
  },
})
