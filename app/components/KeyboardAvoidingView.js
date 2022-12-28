import React from "react"
import {
    KeyboardAvoidingView as View,
    Platform,
    StyleSheet
} from 'react-native'

export const KeyboardAvoidingView = ({ children, style, ...props }) => {
    return (
        <View
            behavior={"position"}
            keyboardVerticalOffset={Platform.OS === 'android' ? -110 : 90}
            style={[styles.container, style]}
            {...props}
        >
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    }
})