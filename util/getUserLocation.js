import * as Location from 'expo-location'

const getUserLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
        return {error: 'Permission to location access was denied'}
    }
    let location = await Location.getCurrentPositionAsync({})
    let postalAddress = await Location.reverseGeocodeAsync(location.coords)
    return postalAddress[0].formattedAddress
}

export default getUserLocation