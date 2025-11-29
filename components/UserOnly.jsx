import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useUser from '../hooks/useUser'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loading from './Loading'

const UserOnly = ({ children }) => {
  const { user, userLoading } = useUser()

  if (!userLoading && !user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Seamless login with email and OTP</Text>
        <Link style={styles.button} href={'/login'}>Login</Link>
      </SafeAreaView>
    )
  }
  if (userLoading) return <Loading />

  return <>{children}</>
}

export default UserOnly

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    position: 'absolute',
    top: 340,
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },
  button: {
    position: 'absolute',
    top: 420,
    fontSize: 30,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#63aa63',
    color: '#fff',
    boxShadow: '2px 2px 2px #000000'
  }
})