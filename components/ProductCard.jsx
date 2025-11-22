import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const ProductCard = ({ details }) => {
    const {
        $id,
        name,
        price,
        numOfPurchases,
        retailer
    } = details
    const router = useRouter()

    const handleClick = () => {
        router.push(`/products/${$id}`)
    }

    return (
        <Pressable onPress={handleClick} style={styles.card}>
            <View style={styles.imageSpace}>
                <Text>[Image goes here]</Text>
            </View>
            <View style={styles.details}>
                <Text style={styles.productName}>{name}</Text>
                <Text style={styles.price}>{price} rs.</Text>
                <Text style={{color: '#6b6b6bc9'}}>{numOfPurchases} purchases till date</Text>
                <Text style={{color: '#6b6b6bc9'}}>Retailer: {retailer}</Text>
            </View>
        </Pressable>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#e4e4e4',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        boxSizing: 'border-box',
        boxShadow: '0px 3px 4px #000000ac',
        borderLeftWidth: 5,
        borderLeftColor: '#318ac5'
    },
    imageSpace: {
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    details: {
        width: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        gap: 1
    },
    productName: {
       fontSize: 25 
    },
    price: {
        fontSize: 20
    }
})