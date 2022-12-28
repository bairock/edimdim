import React, { useEffect } from 'react'
import {
    ScrollView,
    Dimensions,
    StyleSheet
} from 'react-native'
import { useIsFocused } from '@react-navigation/core'

const { width, height } = Dimensions.get('screen')

const Stub = ({ navigation }) => {

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            navigation.navigate("Cart")
        }
    }, [isFocused])

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
    },
    contentContainer: {
        alignItems: 'center'
    }
})

export default Stub