import React, { createContext, useEffect, useRef, useState } from 'react'
import useUser from '../hooks/useUser'
import { supabase } from '../lib/supabase'
import inAppNotify from '../util/inAppNotify'

export const OrdersContext = createContext()

const OrdersProvider = ({children}) => {
    const {user} = useUser()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const ordersUpdateChannel = useRef(null)

    const fetchOrders = async () => {
        setLoading(true)
        const {data, error} = await supabase
            .from('orders')
            .select(`
                id,
                productId,
                customerId,
                deliveryPerson:deliveryPersonId(email),
                statusId,
                created_at,
                otp,
                status (
                    meaning
                ),
                products (
                    name,
                    price
                )
            `)
            .eq('customerId', user.$id)
            .order('created_at', {ascending: false})
        if (error)
            console.error(error)
        else  
            setOrders(data)
        setLoading(false)
    }

    useEffect(() => {
        if (!user) {
            if (ordersUpdateChannel.current)
                supabase.removeChannel(ordersUpdateChannel.current)
            return
        }

        fetchOrders()
        const channel = supabase.channel('ordersUpdate')
        channel
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders', filter: `customerId=eq.${user.$id}` }, payload => {
                if (payload.eventType == 'UPDATE')
                    inAppNotify('One of your order is updated', 'Check out My Orders tab for more information')
                fetchOrders()
            })
            .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'orders', filter: `customerId=eq.${user.$id}` }, payload => {
                inAppNotify('Your order was cancelled', 'But why would you do that? :(')
                fetchOrders()
            })
            .subscribe()
        ordersUpdateChannel.current = channel

        return () => {
            if (ordersUpdateChannel.current) {
                supabase.removeChannel(ordersUpdateChannel.current)
                ordersUpdateChannel.current = null
            }
        }
        
    }, [user])

    return (
        <OrdersContext.Provider value={{orders, loading}}>
            {children}
        </OrdersContext.Provider>
    )
}

export default OrdersProvider