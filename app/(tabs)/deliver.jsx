import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserOnly from '../../components/UserOnly'
import useUser from '../../hooks/useUser'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

const Deliver = () => {
  const {user, userLoading} = useUser()

  if (userLoading) return <Text>Loading</Text>
  return (
    <UserOnly>
      <SafeAreaView>
        <Text>Deliver content</Text>
        <Text>Hello {user?.email}</Text>
        <Link href={'/logout'}>Logout</Link>
      </SafeAreaView>
    </UserOnly>
  )
}

export default Deliver

const styles = StyleSheet.create({})