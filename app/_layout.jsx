import React from 'react'
import { Stack } from 'expo-router'
import UserProvider from '../contexts/UserProvider'

const MainLayout = () => {
  return (
    <UserProvider>
        <Stack screenOptions={{
            headerShown: false
        }} />
    </UserProvider>
  )
}

export default MainLayout