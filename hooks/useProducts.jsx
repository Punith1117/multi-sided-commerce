import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const useProducts = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchProducts = async () => {
			const { data, error } = await supabase
				.from('products')
				.select()
			if (error) {
				console.log(error)
				setLoading(false)
				return
			}
			setProducts(data)
			setLoading(false)
		}
		fetchProducts()
	}, [])

  	return {products, loading}
}

export default useProducts