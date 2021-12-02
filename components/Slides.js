import React, { useEffect, useState } from 'react'
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

const Slides = (props) => {
  const [tricks, setTricks] = useState([])

  //   console.log('Tricks:', tricks)

  useEffect(() => {
    if (tricks.length === 0) {
      setTricks(props.tricks)
    }
  }, [])

  const renderItem = ({ item }) => {
    return (
      <View style={styles.containerCardList}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.buttonPlusRightPart}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.onPress(item)}
          >
            <View style={styles.buttonInfo}>
              <Text style={styles.buttonText}>i</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.rightPart}>
            <TouchableOpacity style={styles.checkBoxButton} />
          </View>
        </View>
      </View>
    )
  }

  if (tricks.length > 0) {
    return (
      <View style={styles.container}>
        <FlatList
          data={tricks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  } else return null
}

export default Slides

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
    backgroundColor: '#FA6767',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
    borderRadius: 10,
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
    backgroundColor: '#FF9F9F',
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
  checkBoxButton: {
    backgroundColor: '#FF9F9F',
    borderColor: '#000',
    borderWidth: 1,
    width: 25,
    height: 25,
    borderRadius: 5,
  },
})
