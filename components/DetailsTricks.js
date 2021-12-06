import React, { useEffect, useState } from 'react'
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import ModalInfo from './ModalInfo'
import ModalDelete from './ModalDelete'
import ModalAdd from './ModalAdd'
import ModalEdit from './ModalEdit'

const DetailsTricks = (props) => {
  const [modalInfoVisible, setmodalInfoVisible] = useState(false)
  const [modalDeleteVisible, setmodalDeleteVisible] = useState(false)
  const [modalEditVisible, setmodalEditVisible] = useState(false)
  const [modalAddVisible, setmodalAddVisible] = useState(false)
  const route = useRoute()
  const [slides, setSlides] = useState([])
  const [airs, setAirs] = useState([])
  const [grabs, setGrabs] = useState([])
  const [category, setCategory] = useState()
  const [userDetails, setUserDetails] = useState()

  const [nameTrickInfo, setNameTrickInfo] = useState()
  const [idTrickInfo, setIdTrickInfo] = useState()
  const [categoryTrickInfo, setCategoryTrickInfo] = useState()
  const [difficultyTrickInfo, setDifficultyTrickInfo] = useState()
  const [descriptionTrickInfo, setDescriptionTrickInfo] = useState()

  const [categoryAdd, setCategoryAdd] = useState()

  const getInfo = (id) => {
    category?.category === 'Slides'
      ? slides.map((slide) => {
          if (slide?.id.includes(id)) {
            setNameTrickInfo(slide?.name)
            setIdTrickInfo(slide?.id)
            setCategoryTrickInfo('Slide')
            setDifficultyTrickInfo(slide?.difficulty)
            setDescriptionTrickInfo(slide?.info)
          }
        })
      : category?.category === 'Airs'
      ? airs.map((air) => {
          if (air?.id === id) {
            setNameTrickInfo(air?.name)
            setIdTrickInfo(air?.id)
            setCategoryTrickInfo('Air')
            setDifficultyTrickInfo(air?.difficulty)
            setDescriptionTrickInfo(air?.info)
          }
        })
      : grabs?.map((grab) => {
          if (grab?.id === id) {
            setNameTrickInfo(grab?.name)
            setIdTrickInfo(grab?.id)
            setCategoryTrickInfo('Grab')
            setDifficultyTrickInfo(grab?.difficulty)
            setDescriptionTrickInfo(grab?.info)
          }
        })
  }

  const showInfo = (id) => {
    getInfo(id)
    setmodalInfoVisible(true)
  }

  const showDelete = (id) => {
    getInfo(id)
    setmodalDeleteVisible(true)
  }

  const showEdit = (id) => {
    getInfo(id)
    setmodalEditVisible(true)
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
          {userDetails?.admin ? (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  showDelete(item.id)
                }}
              >
                <View style={styles.buttonInfo}>
                  <Text style={styles.buttonText}>x</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  showEdit(item.id)
                }}
              >
                <View style={styles.buttonInfo}>
                  <Text style={styles.buttonText}>e</Text>
                </View>
              </TouchableOpacity>
            </>
          ) : null}
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
              !userDetails?.admin ? styles.marginRightNoAdmin : null,
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
          difficultyTrick={difficultyTrickInfo}
          descriptionTrick={descriptionTrickInfo}
          setmodalInfoVisible={setmodalInfoVisible}
        />
        {/* Modal delete */}
        <ModalDelete
          modalDeleteVisible={modalDeleteVisible}
          nameTrick={nameTrickInfo}
          setmodalDeleteVisible={setmodalDeleteVisible}
          deleteTrick={props.deleteTrick}
          categoryTrick={categoryTrickInfo}
          idTrick={idTrickInfo}
        />
        {/* Modal add */}
        <ModalAdd
          modalAddVisible={modalAddVisible}
          setmodalAddVisible={setmodalAddVisible}
          addTricks={props.addTricks}
          categoryTrick={categoryAdd}
        />
        {/* Modal edit */}
        <ModalEdit
          modalEditVisible={modalEditVisible}
          setmodalEditVisible={setmodalEditVisible}
          nameTrick={nameTrickInfo}
          difficultyTrick={difficultyTrickInfo}
          descriptionTrick={descriptionTrickInfo}
          categoryTrick={categoryTrickInfo}
          idTrick={idTrickInfo}
          editTricks={props.editTricks}
        />
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
  button: {
    marginRight: 10,
  },
  buttonInfo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    textAlignVertical: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginRightNoAdmin: {
    marginLeft: 40,
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
})
