import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DATABASE_ID, databases } from '../lib/appwrite'

const useProducts = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const result = await databases.listDocuments({
					databaseId: DATABASE_ID,
					collectionId: 'products',
				})
				setProducts(result.documents)
				setLoading(false)
			} catch (e) {
				console.log(e)
			}
		}
		fetchProducts()
	}, [])

  	return {products, loading}
}

export default useProducts