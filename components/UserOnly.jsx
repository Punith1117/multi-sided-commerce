import { Text, View } from 'react-native'
import React, { useEffect } from 'react'
import useUser from '../hooks/useUser'
import { Link, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const UserOnly = ({ children }) => {
  const { user, userLoading } = useUser()

  if (!userLoading && !user) {
    return (
      <SafeAreaView>
        <Text>Seamless login with email and otp</Text>
        <Link href={'/login'}>Login</Link>
      </SafeAreaView>
    )
  }
  if (userLoading) return <Text>Loading</Text>

  return <>{children}</>
}

export default UserOnly