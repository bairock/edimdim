import React, { useMemo } from "react"
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { useMutation } from '@apollo/client'

import {
    UPDATE_ONE_SHIPMENT,
    DELETE_ONE_SHIPMENT
} from '../gqls'

import {
    Text,
    Icon,
    toast
} from "."

import { COLORS } from "../utils/const"

import { useStateValue } from "../store"

export const Cuonter = ({
    value = 1,
    cart,
    loading,
    onPlus = () => { },
    onMinus = () => { },
    tintColor,
    style,
    textStyle,
    size = 28
}) => {
    const { reducer } = useStateValue()
    const [_, dispatch] = reducer

    const [update] = useMutation(UPDATE_ONE_SHIPMENT)
    const [remove] = useMutation(DELETE_ONE_SHIPMENT)

    const count = useMemo(() => cart ? cart.count : value, [cart, value])
    const color = useMemo(() => tintColor ? tintColor : COLORS.primary.black, [tintColor])

    const plus = async () => {
        if (!loading) {
            if (cart) {
                try {
                    update({
                        variables: {
                            where: { id: cart.id },
                            data: {
                                count: { increment: 1 }
                            }
                        },
                    })
                    //increaseCount
                    dispatch({
                        type: "increaseCount",
                        data: cart.id
                    })
                } catch (e) {
                    console.error(e)
                }
            }
            onPlus()
        }
    }

    const minus = async () => {
        if (count !== 1 && !loading) {
            if (cart) {
                update({
                    variables: {
                        where: { id: cart.id },
                        data: {
                            count: { decrement: 1 }
                        }
                    },
                })
                dispatch({
                    type: "subtractCount",
                    data: cart.id
                })
            }
            onMinus()
        } else if (cart) {
            remove({
                variables: {
                    where: { id: cart.id }
                }
            })
            dispatch({
                type: "removeFromCart",
                data: cart.id
            })
            toast.current.success("Товар удалён из корзины")
        }
    }

    return (
        <View style={[styles.container, style, { opacity: loading ? 0.5 : 1 }]}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={minus}
                disabled={loading}
            >
                <Icon
                    name="minus-circle"
                    size={size}
                    color={count === 1 ? COLORS.primary.gray : color}
                />
            </TouchableOpacity>
            <Text style={[styles.count, textStyle, { color }]}>{count}</Text>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={plus}
                disabled={loading}
            >
                <Icon
                    name="plus-circle"
                    size={size}
                    color={color}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 44,
        backgroundColor: COLORS.secondary.gray,
        borderRadius: 10
    },
    count: {
        fontSize: 14,
        color: COLORS.primary.black,
        marginHorizontal: 15
    },
})