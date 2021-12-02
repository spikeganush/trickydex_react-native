import React, { useEffect, useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'

import SelectableChips from 'react-native-chip/SelectableChips'

const Home = (props) => {
  const navigation = useNavigation()
  const [userDetails, setUserDetails] = useState()
  const [selectCategoryClicked, setSelectCategoryClicked] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState()
  const handleChips = (props) => {
    setSelectedCategories(props)
  }

  useEffect(() => {
    if (!props.auth) {
      navigation.reset({ index: 0, routes: [{ name: 'Signin' }] })
    }
  }, [props.auth])

  useEffect(() => {
    // console.log('Home.js: useEffect', props)
    if (userDetails === undefined) {
      props
        .getUserDetails(props.user.uid)
        .then((document) => setUserDetails(document))
        .catch((error) => console.log(error))
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TrickyDex</Text>
        <View style={styles.headerImage}>
          {props.user.imageUrl ? (
            <Image
              source={{ uri: props.user.imageUrl }}
              style={styles.avatar}
            />
          ) : (
            <Image
              source={require('../img/account.png')}
              style={styles.avatar}
            />
          )}
        </View>
      </View>
      <View
        style={
          selectCategoryClicked
            ? styles.selectCategoriesClicked
            : styles.selectCategories
        }
      >
        <TouchableOpacity
          style={styles.buttonSelectedCategories}
          onPress={() => setSelectCategoryClicked(!selectCategoryClicked)}
        >
          <Text style={styles.selectCategoriesText}>All Categories</Text>
        </TouchableOpacity>
        {selectCategoryClicked ? (
          <SelectableChips
            initialChips={['All', 'Slides', 'Airs', 'Grabs']}
            onChangeChips={(chips) => handleChips(chips)}
            chipStyle={styles.chipStyle}
            valueStyle={styles.chipValueStyle}
            chipStyleSelected={styles.chipStyleSelected}
            valueStyleSelected={styles.chipValueStyleSelected}
            alertRequired={false}
          />
        ) : null}
      </View>
      <ScrollView style={styles.body}>
        {/* slides */}
        <TouchableOpacity onPress={() => navigation.navigate('Slides')}>
          <View style={[styles.card, styles.slidesCard]}>
            <View style={[styles.slidesinfo]}>
              <Text style={styles.cardTitle}>Slides</Text>
              <Text style={styles.cardProgression}>Progression</Text>
              <Text style={styles.cardProgressionText}> 05/10</Text>
              <View style={styles.cardProgressBar} />
            </View>
            <View style={[styles.cardRightPart, styles.slidesRightPart]} />
          </View>
        </TouchableOpacity>
        {/* Airs */}
        <TouchableOpacity onPress={() => navigation.navigate('Airs')}>
          <View style={[styles.card, styles.airsCard]}>
            <View style={[styles.cardinfo]}>
              <Text style={styles.cardTitle}>Airs</Text>
              <Text style={styles.cardProgression}>Progression</Text>
              <Text style={styles.cardProgressionText}> 05/10</Text>
              <View style={styles.cardProgressBar} />
            </View>
            <View style={[styles.cardRightPart, styles.airsRightPart]} />
          </View>
        </TouchableOpacity>
        {/* Grabs */}
        <TouchableOpacity onPress={() => navigation.navigate('Grabs')}>
          <View style={[styles.card, styles.grabsCard]}>
            <View style={[styles.cardinfo]}>
              <Text style={styles.cardTitle}>Grabs</Text>
              <Text style={styles.cardProgression}>Progression</Text>
              <Text style={styles.cardProgressionText}> 05/10</Text>
              <View style={styles.cardProgressBar} />
            </View>
            <View style={[styles.cardRightPart, styles.grabsRightPart]} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
    paddingLeft: 15,
    paddingRight: 15,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    maxHeight: '20%',
    marginTop: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A73E9',
    paddingTop: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0DDCE',
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectCategories: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 15,
    maxHeight: 45,
  },
  selectCategoriesClicked: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 15,
    maxHeight: 90,
  },
  buttonSelectedCategories: {
    backgroundColor: '#DADADA',
    padding: 10,
    paddingRight: 50,
    borderRadius: 6,
  },
  selectCategoriesText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#757575',
  },
  chipStyle: {
    backgroundColor: '#DADADA',
    borderColor: '#DADADA',
  },
  chipValueStyle: {
    color: '#757575',
  },
  chipStyleSelected: {
    backgroundColor: '#1A73E9',
    borderColor: '#1A73E9',
  },
  chipValueStyleSelected: {
    color: '#fff',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
    borderRadius: 10,
    paddingLeft: 15,
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    paddingTop: 10,
  },
  cardProgression: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    paddingTop: 10,
  },
  cardProgressionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  slidesCard: {
    backgroundColor: '#FA6767',
  },
  cardRightPart: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: '100%',
    width: '30%',
  },
  slidesRightPart: {
    backgroundColor: '#FBBFBF',
  },
  airsCard: {
    backgroundColor: '#67FAA2',
  },
  airsRightPart: {
    backgroundColor: '#BFFBE5',
  },
  grabsCard: {
    backgroundColor: '#67A2FA',
    marginBottom: 15,
  },
  grabsRightPart: {
    backgroundColor: '#BFE2FB',
  },
})
