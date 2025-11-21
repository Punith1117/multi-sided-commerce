import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NotFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.error}>This page does not exist</Text>
    </View>
  )
}

export default NotFound

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        color: 'red',
        fontSize: '20px'
    }
})