import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const Index = () => {
    return (
        <Redirect href={'/products'}/> // works the same as useRouter().navigate('/products')
    )
}

export default Index