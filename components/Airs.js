import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Airs = (props) => {
  const [tricks, setTricks] = useState([])

  console.log('Tricks:', tricks)

  useEffect(() => {
    if (tricks.length === 0) {
      setTricks(props.tricks)
    }
  }, [])

  return (
    <View>
      <Text>Airs</Text>
    </View>
  )
}

export default Airs

const styles = StyleSheet.create({})
