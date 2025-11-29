import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ProductCard from '../../../components/ProductCard'
import useProducts from '../../../hooks/useProducts'
import Loading from '../../../components/Loading'

const Products = () => {
	const safeArea = useSafeAreaInsets()
	const {products, loading} = useProducts()

	if (loading) return <Loading />
	
	return (
		<View style={{marginTop: safeArea.top}}>
			<FlatList 
				data={products}
				renderItem={({item}) => <ProductCard details={item}/>}
				keyExtractor={product => product.id.toString()}
			/>
		</View>
	)
}

export default Products

const styles = StyleSheet.create({})