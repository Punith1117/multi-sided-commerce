import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useUser from '../../hooks/useUser'
import UserOnly from '../../components/UserOnly'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

const MyOrders = () => {
	const {user, userLoading} = useUser()
	if (userLoading) return <Text>Loading</Text>
	return (
		<UserOnly>
			<SafeAreaView>
				<Text>MyOrders</Text>
				<Text>Hello {user?.email}</Text>
				<Link href={'/logout'}>Logout</Link>
			</SafeAreaView>
		</UserOnly>
	)
}

export default MyOrders

const styles = StyleSheet.create({})