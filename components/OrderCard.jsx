import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import toHumanReadable from '../util/toHumanReadable'

const OrderCard = ({ details, cancelOrder}) => {
    const {
        id,
        created_at,
        statusId,
        status,
        products,
        deliveryPerson,
        otp
    } = details
    const {date, time} = toHumanReadable(created_at)
    return (
        <View style={[styles.card, (statusId == 3) ? styles.cardGreen : styles.cardPink]}>
            <Text style={styles.title}>{products.name} {products.price}rs.</Text>
            <Text>Order placed at {time} on {date}</Text>
            <Text>Status: {status.meaning}</Text>
            {(statusId > 0) && <Text>
                Delivery: {deliveryPerson.email}    
            </Text>}
            {(statusId == 2) && <Text>
                OTP: {otp}    
            </Text>}
            {(statusId == 0) && <Pressable
                onPress={() => cancelOrder(id)}
                style={styles.cancel}
            >
                <Text>Cancel order</Text>
            </Pressable>}
        </View>
    )
}

export default OrderCard

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 10,
        margin: 8,
    },
    cardPink: {
        backgroundColor: '#fce2ff',
        boxShadow: '0px 5px 5px #f6b8fd'
    },
    cardGreen: {
        backgroundColor: '#e7ffe2',
        boxShadow: '0px 5px 5px #b8fdc3'    
    },
    title: {
        fontSize: 25
    },
    cancel: {
        padding: 10,
        backgroundColor: '#ffbbbb'
    }
})