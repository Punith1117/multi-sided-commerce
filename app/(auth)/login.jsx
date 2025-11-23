import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { account, DATABASE_ID, databases } from '../../lib/appwrite'
import { ID, Query } from 'react-native-appwrite'
import useUser from '../../hooks/useUser'
import { supabase } from '../../lib/supabase'

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

			const { data, error } = await supabase
				.from('users')
				.upsert({userId: user.$id, email: user.email})
				.select()
			if (error) console.log(error)			
		} catch (e) {
			console.log(e)
		} finally {
			router.replace('/products')
		}
	}
  
	return (
		<SafeAreaView>
			<Text>Login</Text>
			<TextInput 
				placeholder='Enter your email here...'
				keyboardType='email-address'
				style={styles.textInput} 
				placeholderTextColor={'#a7a7a7'}
				value={email}
				onChangeText={setEmail}
			/>
			<Button disabled={userId !== null} onPress={() => {handleEmailSubmit(email)}} title='Submit email' />

			{ userId && (
				<>
				<TextInput 
					placeholder='Enter your secret here...'
					keyboardType='visible-password'
					style={styles.textInput} 
					placeholderTextColor={'#ff4b4b'}
					value={secret}
					onChangeText={setSecret}
				/>
				<Button onPress={() => {handleSecretSubmit(secret)}} title='Submit secret' />
				</>
			) }

			<Button onPress={() => {router.replace('/products')}} title='Back' />
		</SafeAreaView>
	)
}

export default Login

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#3a3a3a',
    color: '#fff',
  }
})