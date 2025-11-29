import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
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
        <View style={styles.container}>
          <Text style={styles.title}>Logout</Text>
          <Text style={styles.question}>Are you sure to logout?</Text>
          <Button 
            onPress={handleLogout}
            title='    Yes    '
            color='#ff0c0c'
          />
          <View style={styles.spacer}></View>
          <Button onPress={() => {router.back()}} title='    No    ' />
        </View>
    </SafeAreaView>
  )
}

export default Logout

const styles = StyleSheet.create({
    container: {
      marginTop: 300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10
    },
    title: {
      fontSize: 20,
      color: '#ff0000'
    },
    question: {
      fontSize: 30
    },
    spacer: {
      margin: 30
    }
})