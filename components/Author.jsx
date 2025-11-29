import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Author = () => {
    return (
        <View style={styles.container}>
            <Link href={'https://github.com/Punith1117/multi-sided-commerce'}>
                <Text style={styles.linkText}>by Punith1117</Text>
            </Link>
        </View>
    )
}

export default Author

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginTop: 80
    },
    linkText: {
        textDecorationLine: 'underline',
        color: '#0a63ac'
    }
})