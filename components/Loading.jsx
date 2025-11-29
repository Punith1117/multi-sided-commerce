import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Loading = () => {
    const safeArea = useSafeAreaInsets()

    return (
        <View style={[{marginTop: safeArea.top, marginBottom: safeArea.bottom}, styles.container]}>
            <ActivityIndicator color='#ffb327' size={70} style={{marginTop: 300}}/>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})