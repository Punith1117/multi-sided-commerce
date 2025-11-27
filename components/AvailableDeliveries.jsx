import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AvailableDeliveryCard from './AvailableDeliveryCard'

const AvailableDeliveries = ({deliveryData, acceptOrder}) => {

    return (
        <FlatList 
            data={deliveryData}
            renderItem={({item}) => <AvailableDeliveryCard details={item} acceptOrder={acceptOrder}/>}
            keyExtractor={item => item.id.toString()}
        />
    )
}

export default AvailableDeliveries

const styles = StyleSheet.create({})