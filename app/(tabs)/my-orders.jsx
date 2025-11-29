import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useUser from '../../hooks/useUser'
import UserOnly from '../../components/UserOnly'
import { Link } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { supabase } from '../../lib/supabase'
import OrderCard from '../../components/OrderCard'
import useOrders from '../../hooks/useOrders'

const MyOrders = () => {
	const {user, userLoading} = useUser()
	const safeArea = useSafeAreaInsets()
	const {orders, loading: ordersLoading} = useOrders()
	
	const cancelOrder = async (id) => {
		await supabase
			.from('orders')
			.delete()
			.eq('id', id)
	}

	if (userLoading || ordersLoading) return <Text>Loading</Text>

	return (
		<UserOnly>
			<View style={{marginTop: safeArea.top, marginBottom: safeArea.bottom - 20}}>
				<Text style={styles.greeting}>Hello, {user?.email} !</Text>
				<FlatList 
					data={orders}
					renderItem={({item}) => <OrderCard details={item} cancelOrder={cancelOrder}/>}
					keyExtractor={order => order.id.toString()}
				/>
				<Link href={'/logout'} style={styles.logout}>Logout</Link>
			</View>
		</UserOnly>
	)
}

export default MyOrders

const styles = StyleSheet.create({
	logout: {
		position: 'absolute',
		top: 35,
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