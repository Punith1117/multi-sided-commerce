import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';

const CurrentDelivery = ({deliveryData, cancelOrder, updateOrder}) => {
	const {
		id,
		statusId,
		product,
		dropLocation,
		customer
	} = deliveryData
	const [otp, setOtp] = useState()
  
	return (
		<View style={styles.container}>
			<Text style={styles.textLight}>ID: {id}</Text>
			<View style={styles.pickupDrop}>
				<Text style={styles.title}>Pickup: {product.location}</Text>
				<Text style={styles.textLight}>Retailer: {product.retailer}</Text>
			</View>
			<Feather name="arrow-down" size={40} color="black" />
			<View style={ styles.pickupDrop}>
				<Text style={styles.title}>Drop: {dropLocation}</Text>
				<Text style={styles.textLight}>Customer: {customer.email}</Text>
			</View>
			{(statusId == 1) && 
				<View style={styles.status1}>
					<Button 
						title='I have picked up the product from drop location'
						onPress={() => updateOrder()}
						color='#53b33b'
					/>
					<Button 
						title='Cancel'
						onPress={() => cancelOrder(id)}
						color='#d84545'
					/>
				</View> 
			}
			{(statusId == 2) &&
				<View style={styles.status2}>
					<Text>Enter OTP sent to customer</Text>
					<TextInput 
						onChangeText={newOtp => setOtp(newOtp)} 
						value={otp} 
						style={styles.textInput}
						keyboardType='numeric'
					/>
					<Pressable 
						onPress={() => updateOrder(otp)}
					>
						<Text style={styles.submitButton}>Submit</Text>
					</Pressable>
				</View>
			}
		</View>
	)
}

export default CurrentDelivery

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 20,
		gap: 10,
		backgroundColor: '#fffaca',
		paddingTop: 30,
		padding: 20
	},
	pickupDrop: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},
	title: {
		fontSize: 20
	},
	textLight: {
		fontSize: 18,
		color: '#00000078'
	},
	textInput: {
		backgroundColor: '#61d367',
		width: 100,
		fontSize: 20,
		textAlign: 'center'
	},
	status2: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,

	},
	submitButton: {
		backgroundColor: '#51a155',
		color: '#ffff',
		fontSize: 20,
		padding: 10
	},
	status1: {
		display: 'flex',
		gap: 30
	}
})