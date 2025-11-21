import { StyleSheet, Button } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const TabLayout = () => {
  return (
    <Tabs screenOptions={{
        headerShown: false
    }}>
        <Tabs.Screen 
            name='products'
            options={{
                title: 'Products'
            }}
        />
        <Tabs.Screen 
            name='deliver'
            options={{
                title: 'Deliver'
            }}
        />
        <Tabs.Screen 
            name='my-orders'
            options={{
                title: 'My Orders'
            }}
        />
    </Tabs>
  )
}

export default TabLayout

const styles = StyleSheet.create({
    mainView: {
        display: 'flex',
        alignItems: 'center',
        flex: 1
    },
    content: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nav: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 5,
        padding: 5,
        backgroundColor: '#f7cccc',
        position: 'absolute',
        bottom: 0
    }
})
