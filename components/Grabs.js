import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Grabs = (props) => {
  const [tricks, setTricks] = useState([])

  console.log('Tricks:', tricks)

  useEffect(() => {
    if (tricks.length === 0) {
      setTricks(props.tricks)
    }
  }, [])

  return (
    <View>
      <Text>Grabs</Text>
    </View>
  )
}

export default Grabs

const styles = StyleSheet.create({})
