import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { account } from '../../lib/appwrite'
import useUser from '../../hooks/useUser'

const Logout = () => {
  const router = useRouter()
  const {setUser} = useUser()

  const handleLogout = async () => {
    try {
      	await account.deleteSessions()
      	setUser(null)
        router.replace('/products')
    } catch (e) {
      	console.log(e)
    }
  }

  return (
    <SafeAreaView>
        <Text>Logout</Text>
        <Text>Are you sure to logout?</Text>
        <Button onPress={handleLogout} title='Yes' />
        <Button onPress={() => {router.replace('/products')}} title='Back' />
    </SafeAreaView>
  )
}

export default Logout

const styles = StyleSheet.create({
  	textInput: {
    	backgroundColor: '#3a3a3a',
    	color: '#fff',
  	}
})