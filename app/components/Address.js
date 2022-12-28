import React from "react"
import {
    View,
    StyleSheet
} from 'react-native'

import {
    Button,
    Text,
    Icon
} from "."

import { COLORS } from "../utils/const"

export const Address = ({
    item,
    onPressAddress = () => { },
    style,
    labelStyle,
    textStyle,
    itemStyle,
    selectedAddress
}) => {

    if (!item) {
        return null
    }

    return (
        <View style={[styles.addressItemConainer, style]}>
            <Button
                style={[styles.addressItem, itemStyle]}
                onPress={onPressAddress}
            >
                <Text numberOfLines={1} style={[styles.addressItemText, textStyle]}>{item}</Text>
                {
                    selectedAddress === item ? (
                        <Icon name="circle-check" size={23} color={COLORS.primary.green} style={{ marginLeft: 5 }} />
                    ) : null
                }
            </Button>
            <Text style={[styles.addressLabel, labelStyle]}>
                Адрес
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    addressItemConainer: {
        width: '100%'
    },
    addressItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: '#B5B8B6',
        borderRadius: 12,
        marginBottom: 15
    },
    addressItemText: {
        flex: 1,
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-Regular',
    },
    addressLabel: {
        color: COLORS.primary.gray,
        marginBottom: 5,
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',
        position: 'absolute',
        left: 10,
        top: -9,
        backgroundColor: COLORS.secondary.white,
        paddingHorizontal: 5,
    },
})