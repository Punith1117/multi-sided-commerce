import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useProductDetails from '../../../hooks/useProductDetails'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useUser from '../../../hooks/useUser'
import generateOtp from '../../../util/generateOtp'
import getUserLocation from '../../../util/getUserLocation'
import { supabase } from '../../../lib/supabase'
import inAppNotify from '../../../util/inAppNotify'

const ProductDetails = () => {
    const safeArea = useSafeAreaInsets()
    const {id} = useLocalSearchParams()
    const {loading, product} = useProductDetails(id)
    const router = useRouter()
    const {user} = useUser()
    const [orderLoading, setOrderLoading] = useState(false)

    const handlePlaceOrder = async () => {
        setOrderLoading(true)
        const dropLocation = await getUserLocation()
        if (dropLocation.error) {
            console.log(dropLocation.error)
            inAppNotify(
                'Location permission denied', 
                'Your current location is necessary to place order. Please enable it by navigating to app settings'
            )
            setOrderLoading(false)
        } else {
            const {error} = await supabase
                .from('orders')
                .insert({
                    productId: id,
                    customerId: user.$id,
                    statusId: 0,
                    dropLocation: dropLocation,
                    otp: generateOtp()
                })
            if (error) console.log(error)
            inAppNotify(
                `Awesome! Your order(${name}) is successfully placed`,
                'For further updates stay on My Orders tab'
            )
            setOrderLoading(false)
            router.navigate('/my-orders')
        }
    }
    
    if (loading) return (
        <View style={{marginTop: safeArea.top}}>
            <Text>Loading...</Text>
        </View>
    )

    const {
        id: productId, // id conflicts with already declared param id
        name,
        price,
        numOfPurchases,
        retailer,
        description,
    } = product

    return (
        <View style={{marginTop: safeArea.top}}>
            <Text style={styles.heading}>ProductDetails</Text>
            <View style={styles.card}>
                <View style={styles.imageSpace}>
                    <Text>[Image goes here]</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.productName}>{name}</Text>
                    <Text style={styles.price}>{price} rs.</Text>
                    <Text style={{color: '#6b6b6bc9', fontSize: 18}}>{numOfPurchases} purchases till date</Text>
                    <Text style={{color: '#6b6b6bc9', fontSize: 18}}>Description: {description}</Text>
                    <Text style={{color: '#6b6b6bc9', fontSize: 18}}>Retailer: {retailer}</Text>
                </View>
            </View>
            <View style={styles.buttons}>
                {user ? <Button
                    disabled={orderLoading ? true : false}
                    title='Place order'
                    onPress={handlePlaceOrder}
                    color='#57b696'
                /> : <Button 
                    title='Login to place order'
                    onPress={() => {
                        router.push('/login')
                    }}
                    color='#925146'
                />}
                <Button 
                    title='Back'
                    onPress={() => {
                        if (router.canGoBack()) {
                            router.back()
                        } else {
                            router.replace('/products')
                        }
                    }}
                    color='#469279'
                />
            </View>
        </View>
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    heading: {
        padding: 10,
        fontSize: 20,
        alignSelf: 'center',
        backgroundColor: '#c3ffeb'
    },
    card: {
        display: 'flex',
        margin: 10,
        padding: 10,
        borderRadius: 5,
        boxSizing: 'border-box',
        boxShadow: '0px 3px 4px #66bea1',
        borderTopWidth: 5,
        borderTopColor: '#98e9ce',
        borderBottomWidth: 5,
        borderBottomColor: '#66bea1'
    },
    imageSpace: {
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e4e4e4'
    },
    details: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    productName: {
       fontSize: 25 
    },
    price: {
        fontSize: 20
    },
    buttons: {
        marginTop: 10,
        display: 'flex',
        gap: 20
    }
})