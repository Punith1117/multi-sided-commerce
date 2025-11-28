import React, { createContext, useEffect, useRef, useState } from 'react'
import useUser from '../hooks/useUser'
import { supabase } from '../lib/supabase'

export const DeliveryContext = createContext()

const DeliveryProvider = ({children}) => {
    const {user} = useUser()
    const [loading, setLoading] = useState(true)
    const [orderAccepted, setOrderAccepted] = useState(null)
    const [deliveryData, setDeliveryData] = useState(null)
    const deliveryUpdateChannel = useRef(null)

    const fetchAvailableOrders = async () => {
        setLoading(true)
        const {data, error} = await supabase
            .from('orders')
            .select(`
                id,
                product: productId (
                    location
                ),
                dropLocation
            `)
            .eq('statusId', 0)
            .neq('customerId', user.$id)
            .order('created_at', {ascending: false})
        if (error) {
            console.log(error)
            return
        }
        setDeliveryData(data)
        setLoading(false)
    }
    
    const fetchAcceptedOrder = async () => {
        setLoading(true)
        const {data, error} = await supabase
            .from('orders')
            .select(`
                id,
                statusId,
                product: productId (
                    location,
                    retailer
                ),
                customer: customerId (
                    email
                ),
                dropLocation
            `)
            .eq('deliveryPersonId', user.$id)
            .neq('statusId', 3)
        if (error) {
            console.log(error)
            return
        }
        setDeliveryData(data[0])
        setLoading(false)
    }

    useEffect(() => {
        if (!user) {
            if (deliveryUpdateChannel.current) {
                supabase.removeChannel(deliveryUpdateChannel.current)
                deliveryUpdateChannel.current = null   
            }
            setDeliveryData(null)
            return
        }
        
        if (orderAccepted == true) {
            if (deliveryUpdateChannel.current) {
                supabase.removeChannel(deliveryUpdateChannel.current)
                deliveryUpdateChannel.current = null   
            }
            fetchAcceptedOrder()
        } else if (orderAccepted == false) {
            fetchAvailableOrders()
            const channel = supabase.channel('deliveryUpdate')
            channel
                .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, payload => {
                    if (payload.eventType == 'INSERT' || payload.eventType == 'DELETE') {
                        fetchAvailableOrders()
                    } else if (payload.new.statusId == 0) {
                        fetchAvailableOrders()
                    }
                })
                .subscribe()
            deliveryUpdateChannel.current = channel   
        }

        return () => {
            if (deliveryUpdateChannel.current || !user) {
                supabase.removeChannel(deliveryUpdateChannel.current)
                deliveryUpdateChannel.current = null
            }
        }
    }, [user, orderAccepted])

    useEffect(() => {
        if (!user) return
        const initialCheck = async () => {
            setLoading(true)
            const {data, error} = await supabase
                .from('orders')
                .select()
                .eq('deliveryPersonId', user.$id)
                .neq('statusId', 3)
            if (error) {
                console.error(error)
                return
            }
            if (data.length > 0) setOrderAccepted(true)
            else setOrderAccepted(false)
            setLoading(false)
        }
        initialCheck()
    }, [user])

    return (
        <DeliveryContext.Provider value={{
            orderAccepted,
            setOrderAccepted,
            loading,
            setLoading,
            deliveryData,
            setDeliveryData
        }}>
            {children}
        </DeliveryContext.Provider>
    )
}

export default DeliveryProvider