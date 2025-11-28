import { useContext } from "react"
import { DeliveryContext } from "../contexts/DeliveryProvider"

const useDelivery = () => {
    const context = useContext(DeliveryContext)

    if (!context) {
        throw new Error('useDelivery hook must be used within DeliveryProvider')
    }

    return context
}

export default useDelivery