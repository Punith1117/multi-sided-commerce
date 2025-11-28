import React from 'react'
import { Stack } from 'expo-router'
import UserProvider from '../contexts/UserProvider'
import OrdersProvider from '../contexts/OrdersProvider'
import DeliveryProvider from '../contexts/DeliveryProvider'

const MainLayout = () => {
  return (
    <UserProvider>
      <OrdersProvider>
      <DeliveryProvider>
        <Stack screenOptions={{
            headerShown: false
        }} />
      </DeliveryProvider>
      </OrdersProvider>
    </UserProvider>
  )
}

export default MainLayout