import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserOnly from '../../components/UserOnly'
import useUser from '../../hooks/useUser'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import AvailableDeliveries from '../../components/AvailableDeliveries'
import CurrentDelivery from '../../components/CurrentDelivery'
import useDelivery from '../../hooks/useDelivery'

const Deliver = () => {
  const {user, userLoading} = useUser()
  const {
    deliveryData, 
    setDeliveryData, 
    orderAccepted, 
    setOrderAccepted, 
    loading, 
    setLoading
  } = useDelivery()

  const acceptOrder = async (id) => {
    console.log('Order accepted')
    // to do
  }

  const cancelOrder = async (id) => {
    console.log('Order cancelled')
    // to do
  }

  const updateOrder = async (otp) => {
    console.log('Order updated')
    // to do
  }

  if (userLoading || loading) return <Text>Loading</Text>

  return (
    <UserOnly>
      <SafeAreaView>
        <Text>Hello {user?.email}</Text>
        {orderAccepted
          ? <CurrentDelivery deliveryData={deliveryData} cancelOrder={cancelOrder} updateOrder={updateOrder}/>
          : <AvailableDeliveries deliveryData={deliveryData} acceptOrder={acceptOrder}/>
        }
        <Link href={'/logout'}>Logout</Link>
      </SafeAreaView>
    </UserOnly>
  )
}

export default Deliver

const styles = StyleSheet.create({})