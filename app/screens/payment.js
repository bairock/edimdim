import React from "react"
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import { WebView } from 'react-native-webview'

import {
    Button,
} from '../components'

const { width } = Dimensions.get("window")

const Payment = ({ route, navigation }) => {
    const { uri } = route.params
    return (
        <WebView
            source={{ uri }}
            style={styles.container}
            onNavigationStateChange={state => {
                if (state.url) {
                    const match = state.url.match(/\/edimdim.ru/gm)
                    if (match) {
                        navigation.navigate("OrderStack")
                    }
                }
            }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width
    }
})

export default Payment