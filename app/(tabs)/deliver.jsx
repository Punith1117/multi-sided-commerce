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
import inAppNotify from '../../util/inAppNotify'

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
    if (deliveryData.statusId == 2) {
      if (otp == '' || otp == undefined) {
        inAppNotify(`Invisible OTP?!`, 'I have never seen it until now :(')
        return
      }
      const {data, error} = await supabase
        .functions
        .invoke('verify-otp', {
          body: {
            otp: otp,
            orderId: deliveryData.id
          }
        })
      if (error) {
        console.error(error)
        return
      }
      if (data.isCorrect == true) {
        const {error} = await supabase
        .from('orders')
        .update({
          statusId: 3
        })
        .eq('id', deliveryData.id)
        if (error) {
          console.error(error)
          return
        }
        inAppNotify('Congratulations!! :)', 'You have successfully completed the delivery')
        setOrderAccepted(false)
      } else {
        inAppNotify('Invalid OTP :(', 'Try again!')
      }
    } else {
      const {data, error} = await supabase
        .from('orders')
        .update({
          statusId: 2
        })
        .eq('id', deliveryData.id)
        .select(`
          id,
          statusId,
          product: productId (
              location,
              retailer
          ),
          customer: customerId (
              email
          ),
          dropLocation
        `)
      if (error) {
        console.error(error)
        return
      }
      setDeliveryData(data[0])
    }
  }

  if (userLoading || loading) return <Text>Loading</Text>

  return (
    <UserOnly>
      <SafeAreaView>
        <Text style={styles.greeting}>Hello, {user?.email} !</Text>
        {orderAccepted
          ? <CurrentDelivery deliveryData={deliveryData} cancelOrder={cancelOrder} updateOrder={updateOrder}/>
          : <AvailableDeliveries deliveryData={deliveryData} acceptOrder={acceptOrder}/>
        }
        <Link href={'/logout'} style={styles.logout}>Logout</Link>
      </SafeAreaView>
    </UserOnly>
  )
}

export default Deliver

const styles = StyleSheet.create({
  logout: {
		position: 'absolute',
		top: 75,
		right: 8,
		backgroundColor: '#ffffff',
		padding: 8,
		borderRadius: 10,
		color: '#000000',
		boxShadow: '3px 3px 6px #000000b2'
	},
	greeting: {
		textAlign: 'center',
		fontSize: 20
	}
})