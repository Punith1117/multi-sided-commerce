import React, { useEffect, useState } from 'react'
import { DATABASE_ID, databases } from '../lib/appwrite'

const useProductDetails = (id) => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await databases.getDocument({
                    databaseId: DATABASE_ID,
                    collectionId: 'products',
                    documentId: id,
                })
                setProduct(result)
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        fetchProduct()
    }, [])
    
    return {product, loading}
}

export default useProductDetails