import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { account } from '../../lib/appwrite'
import { ID } from 'react-native-appwrite'
import useUser from '../../hooks/useUser'
import { supabase } from '../../lib/supabase'
import inAppNotify from '../../util/inAppNotify'

const Login = () => {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [secret, setSecret] = useState('')
	const [userId, setUserId] = useState(null)
	const {setUser, setUserLoading} = useUser()

	const handleEmailSubmit = async (email) => {
		try {
			const sessionToken = await account.createEmailToken({
				userId: ID.unique(),
				email
			})
			setUserId(sessionToken.userId)
		} catch (e) {
			inAppNotify('Email is not valid', 'Please try a different one')
			console.log(e)
		}
	}

	const handleSecretSubmit = async (secret) => {
		try {
			await account.createSession({
				userId,
				secret
			})
			const user = await account.get()
			setUser(user)			
			setUserLoading(false)

			const { error } = await supabase
				.from('users')
				.upsert({userId: user.$id, email: user.email})
			if (error) console.log(error)			
			router.back()
		} catch (e) {
			console.log(e)
			inAppNotify('Invalid secret', 'Check the mail sent to you again')
		}
	}
  
	return (
		<SafeAreaView style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
			<View style={styles.container}>
				<Text style={styles.title}>Login</Text>
				<View style={styles.emailContainer}>
					<TextInput 
						placeholder='Enter your email here...'
						keyboardType='email-address'
						style={styles.emailInput} 
						placeholderTextColor='#a7a7a7'
						onChangeText={updated => setEmail(updated)}
						value={email}
					/>
					<Button disabled={userId !== null} onPress={() => {handleEmailSubmit(email)}} title='Submit email' />
				</View>

				{ userId && (
					<View style={styles.secretContainer}>
						<TextInput 
							placeholder='******'
							keyboardType='numeric'
							style={styles.secretInput} 
							placeholderTextColor='#ff4b4b'
							onChangeText={updated => setSecret(updated)}
							value={secret}
						/>
						<Button onPress={() => {handleSecretSubmit(secret)}} title='Submit secret' />
					</View>
				) }

				<Button onPress={() => {router.back()}} title='Back' />
			</View>
		</SafeAreaView>
	)
}

export default Login

const styles = StyleSheet.create({
  emailInput: {
    backgroundColor: '#3a3a3a',
    color: '#fff',
  },
  container: {
	marginTop: 150,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: 50
  },
  title: {
	fontSize: 30
  },
  emailContainer: {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'stretch',
	gap: 5,
	width: 300
  },
  secretContainer: {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	gap: 20
  },
  secretInput: {
	backgroundColor: '#000000',
	textAlign: 'center',
	color: '#fff',
	fontSize: 20,
	boxSizing: 'border-box',
	padding: 5,
	width: 130,
	borderRadius: 20,
	letterSpacing: 5
  }
})