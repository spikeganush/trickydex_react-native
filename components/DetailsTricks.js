import React, { useEffect, useState } from 'react'
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import ModalInfo from './ModalInfo'
1
import Slider from '@react-native-community/slider'

const DetailsTricks = (props) => {
  const [modalInfoVisible, setmodalInfoVisible] = useState(false)
  const [modalEditVisible, setmodalEditVisible] = useState(false)
  const [modalAddVisible, setmodalAddVisible] = useState(false)
  const route = useRoute()
  const [slides, setSlides] = useState([])
  const [airs, setAirs] = useState([])
  const [grabs, setGrabs] = useState([])
  const [category, setCategory] = useState()
  const [userDetails, setUserDetails] = useState()

  const [nameTrickInfo, setNameTrickInfo] = useState()
  const [descriptionTrickInfo, setDescriptionTrickInfo] = useState()

  const [nameEdit, setNameEdit] = useState()
  const [descriptionEdit, setDescriptionEdit] = useState()

  const [nameAdd, setNameAdd] = useState()
  const [descriptionAdd, setDescriptionAdd] = useState()

  const [addDifficulty, setAddDifficulty] = useState(0)
  const [categoryAdd, setCategoryAdd] = useState()

  const getInfo = (id) => {
    category?.category === 'Slides'
      ? slides.map((slide) => {
          if (slide?.id.includes(id)) {
            setNameTrickInfo(slide?.name)
            setDescriptionTrickInfo(slide?.info)
          }
        })
      : category?.category === 'Airs'
      ? airs.map((air) => {
          if (air?.id === id) {
            setNameTrickInfo(air?.name)
            setDescriptionTrickInfo(air?.info)
          }
        })
      : grabs?.map((grab) => {
          if (grab?.id === id) {
            setNameTrickInfo(grab?.name)
            setDescriptionTrickInfo(grab?.info)
          }
        })
  }

  const showInfo = (id) => {
    getInfo(id)
    setmodalInfoVisible(true)
  }

  useEffect(() => {
    if (category?.category === 'Slides') {
      setCategoryAdd('Slide')
    } else if (category?.category === 'Airs') {
      setCategoryAdd('Air')
    } else if (category?.category === 'Grabs') {
      setCategoryAdd('Grab')
    }

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
              showInfo(item.id)
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
        {/* Modal info */}
        <ModalInfo
          modalInfoVisible={modalInfoVisible}
          nameTrick={nameTrickInfo}
          descriptionTrick={descriptionTrickInfo}
          setmodalInfoVisible={setmodalInfoVisible}
        />
        {/* Modal add */}
        <Modal
          animationType="fade"
          visible={modalAddVisible}
          transparent={true}
        >
          <View style={styles.modalAddContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderLeftPart}>
                <Text style={styles.modalTitle}>Add {category?.category}</Text>
              </View>
              <Text
                style={styles.closeModal}
                onPress={() => setmodalAddVisible(false)}
              >
                X
              </Text>
            </View>
            <Text style={styles.modalAddName}>{category?.category} Name</Text>
            <TextInput
              style={styles.modalAddNameInput}
              onChangeText={(text) => setNameAdd(text)}
            />
            <Text style={styles.modalAddSlideText}>
              {category?.category} difficulty: {addDifficulty}
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
              {category?.category} information
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
                  category.category === 'Slides'
                    ? styles.containerCardListSlideBg
                    : category.category === 'Airs'
                    ? styles.containerCardListAirBg
                    : styles.containerCardListGrabBg,
                ]}
                onPress={() => {
                  props.addTricks(
                    categoryAdd,
                    nameAdd,
                    addDifficulty,
                    descriptionAdd
                  )
                  setmodalAddVisible(false)
                  setNameAdd('')
                  setDescriptionAdd('')
                  setAddDifficulty(0)
                  category?.category === 'Slides'
                    ? setSlides(props.slides)
                    : category?.category === 'Airs'
                    ? setAirs(props.airs)
                    : setGrabs(props.grabs)
                }}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.title}>
          <Text style={styles.titleText}>{category?.category}</Text>
        </View>
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
        {userDetails?.admin ? (
          <View style={styles.admin}>
            <TouchableOpacity
              style={[
                category.category === 'Slides'
                  ? styles.containerCardListSlideBg
                  : category.category === 'Airs'
                  ? styles.containerCardListAirBg
                  : styles.containerCardListGrabBg,
                styles.buttonAdd,
              ]}
              onPress={() => {
                setmodalAddVisible(true)
              }}
            >
              <Text style={styles.buttonAddText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : null}
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
  title: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#000',
  },
  admin: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  buttonAdd: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 55,
    height: 55,
    borderRadius: 28,
    justifyContent: 'center',
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
  buttonAddText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 5,
  },
  modalAddContainer: {
    margin: 40,
    height: 550,
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
  modalAddSlideText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
})
