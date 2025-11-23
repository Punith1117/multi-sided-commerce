import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const useProductDetails = (id) => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            const {data, error} = await supabase
                .from('products')
                .select()
                .eq('id', id)

            if (error) {
                console.log(error)
                setLoading(false)
                return
            }
            setProduct(data[0])
            setLoading(false)
        }
        fetchProduct()
    }, [])
    
    return {product, loading}
}

export default useProductDetails