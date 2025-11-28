import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserOnly from '../../components/UserOnly'
import useUser from '../../hooks/useUser'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import AvailableDeliveries from '../../components/AvailableDeliveries'
import CurrentDelivery from '../../components/CurrentDelivery'
import useDelivery from '../../hooks/useDelivery'
import { supabase } from '../../lib/supabase'

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
    const {error} = await supabase
      .from('orders')
      .update({
        statusId: 1,
        deliveryPersonId: user.$id
      })
      .eq('id', id)
    if (error) {
      console.error(error)
      return
    }
    setLoading(true)
    setOrderAccepted(true)
  }

  const cancelOrder = async (id) => {
    const {error} = await supabase
      .from('orders')
      .update({
        statusId: 0,
        deliveryPersonId: null
      })
      .eq('id', id)
    if (error) {
      console.error(error)
      return
    }
    setOrderAccepted(false)
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