import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import UserOnly from '../../components/UserOnly'
import { Link } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { supabase } from '../../lib/supabase'
import OrderCard from '../../components/OrderCard'

const MyOrders = () => {
	const {user, userLoading} = useUser()
	const safeArea = useSafeAreaInsets()
	const [orders, setOrders] = useState([])
	const [ordersLoading, setOrdersLoading] = useState(false)
	
	useEffect(() => {
		const fetchOrders = async () => {
			setOrdersLoading(true)
			const {data, error} = await supabase
				.from('orders')
				.select(`
					id,
					productId,
					customerId,
					deliveryPerson:deliveryPersonId(email),
					statusId,
					created_at,
					otp,
					status (
						meaning
					),
					products (
						name,
						price
					)
				`)
				.eq('customerId', user.$id)
				.order('created_at', {ascending: false})
			if (error)
				console.log(error)
			else  
				setOrders(data)
			setOrdersLoading(false)
		}
		if (!userLoading && user) fetchOrders()
	}, [user, userLoading])
	
	const cancelOrder = async (id) => {
		await supabase
			.from('orders')
			.delete()
			.eq('id', id)
	}

	if (userLoading || ordersLoading) return <Text>Loading</Text>

	return (
		<UserOnly>
			<View style={{marginTop: safeArea.top, marginBottom: safeArea.bottom}}>
				<Text>Hello {user?.email}</Text>
				<FlatList 
					data={orders}
					renderItem={({item}) => <OrderCard details={item} cancelOrder={cancelOrder}/>}
					keyExtractor={order => order.id.toString()}
				/>
				<Link href={'/logout'}>Logout</Link>
			</View>
		</UserOnly>
	)
}

export default MyOrders

const styles = StyleSheet.create({})