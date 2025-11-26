import React from 'react'
import { Stack } from 'expo-router'
import UserProvider from '../contexts/UserProvider'
import OrdersProvider from '../contexts/OrdersProvider'

const MainLayout = () => {
  return (
    <UserProvider>
      <OrdersProvider>
        <Stack screenOptions={{
            headerShown: false
        }} />
      </OrdersProvider>
    </UserProvider>
  )
}

export default MainLayout