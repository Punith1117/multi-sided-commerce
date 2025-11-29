import { StyleSheet, Button } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import {FontAwesome6} from '@expo/vector-icons/';

const TabLayout = () => {
  return (
    <Tabs screenOptions={{
        headerShown: false
    }}>
        <Tabs.Screen 
            name='products'
            options={{
                title: 'Products',
                tabBarIcon: ({color}) => <FontAwesome6 size={28} name='store' color={color}/>
            }}
        />
        <Tabs.Screen 
            name='deliver'
            options={{
                title: 'Deliver',
                tabBarIcon: ({color}) => <FontAwesome6 size={28} name='truck-fast' color={color}/>
            }}
        />
        <Tabs.Screen 
            name='my-orders'
            options={{
                title: 'My Orders',
                tabBarIcon: ({color}) => <FontAwesome6 size={28} name='table-list' color={color}/>
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
