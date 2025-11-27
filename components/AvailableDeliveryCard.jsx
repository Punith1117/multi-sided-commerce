import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';

const AvailableDeliveryCard = ({details, acceptOrder}) => {
	const {id, pickup, drop} = details
    return (
        <View style={styles.container}>
          	<Text style={styles.location}>Pickup: {pickup}</Text>
			<Feather style={{alignSelf: 'center'}} name="arrow-down" size={30} color="white" />
			<Text style={styles.location}>Drop: {drop}</Text>
			<Pressable 
				onPress={() => acceptOrder(id)}
				style={styles.acceptButton}
			>
				<Text>Accept Order</Text>
			</Pressable>
        </View>
    )
}

export default AvailableDeliveryCard

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems:'center',
		gap: 7,
		backgroundColor: '#86d1ff',
		padding: 10,
		margin: 5,
		borderRadius: 5
	},
	location: {
		padding: 5,
		fontSize: 15,
		backgroundColor: '#b8e4ff',
		boxShadow: '0px 0px 15px #b8e4ff'
	},
	acceptButton: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#c1e6b0',
		fontSize: 30,
		padding: 10,
		borderRadius: 15,
		boxShadow: '3px 3px 2px #658358'
	}
})