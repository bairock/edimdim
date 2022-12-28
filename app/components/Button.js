import React from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native'
import { COLORS } from '../utils/const'

export const Button = ({
    text = "Кнопка",
    style,
    textStyle,
    loading = false,
    disabled = false,
    onPress = () => { },
    children,
    loadingColor = COLORS.primary.white,
    disabledColor = COLORS.secondary.gray,
    ...props
}) => {

    const handleSubmit = () => {
        if (!loading && !disabled) {
            onPress()
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.container,
                {
                    backgroundColor: disabled ? disabledColor : COLORS.primary.green
                },
                style,
            ]}
            onPress={handleSubmit}
            {...props}
        >
            {
                loading ? (
                    <ActivityIndicator animating size="small" color={loadingColor} />
                ) : children ? children : (
                    <Text numberOfLines={1} style={[styles.text, textStyle]}>{text}</Text>
                )
            }
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        height: 44,
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: COLORS.primary.green,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    text: {
        fontSize: 14,
        color: COLORS.primary.white,
        fontFamily: 'Montserrat-SemiBold'
    }
})