import React, { useMemo, useState } from 'react'
import {
    StyleSheet,
    Image,
    View,
    Alert,
} from 'react-native'
import { useMutation } from '@apollo/client'

import {
    Button,
    Cuonter,
    Icon,
    Text,
    toast
} from '.'

import { rootNavigate } from '../routes'
import { useStateValue } from '../store'

import { CREATE_ONE_SHIPMENT, DELETE_MANY_SHIPMENT } from '../gqls'

import { COLORS } from '../utils/const'
import { imageUrl } from '../utils/endpoints'
import { useUser } from '../utils/hooks'

export const Product = ({ product, size, style, restaurant }) => {

    const { reducer } = useStateValue()
    const [state, dispatch] = reducer
    const { user } = useUser()

    const inCart = useMemo(() => state.products.find(item => item.product === product.id), [state.products])

    const [create, { loading }] = useMutation(CREATE_ONE_SHIPMENT, {
        onCompleted: ({ createOneShipment }) => {
            if (createOneShipment) {
                dispatch({
                    type: "updateData",
                    data: {
                        id: createOneShipment.id,
                        count: createOneShipment.count,
                        product: product.id,
                        restaurant: restaurant.id
                    }
                })
            }
        }
    })

    const [claearShipments, { loading: deleteLoading }] = useMutation(DELETE_MANY_SHIPMENT, {
        variables: {
            where: { id: { in: state.products.map(item => item.id) } }
        },
        onCompleted: () => {
            dispatch({
                type: "setCart",
                data: []
            })
            create({
                variables: {
                    data: {
                        count: 1,
                        product: {
                            connect: { id: product.id }
                        },
                        user: user ? { connect: { id: user.id } } : undefined
                    }
                }
            })
            dispatch({
                type: "addToCart",
                data: {
                    id: new Date().getTime().toString(),
                    count: 1,
                    product: product.id,
                    restaurant: restaurant.id
                }
            })
            toast.current.success("Товар добавлен")
        },
        onError: e => {
            toast.current.error("Не удалось очистить корзину")
        }
    })

    const addToCart = () => {
        if (state.products.length > 0) {
            const product = state.products[0]
            if (product.restaurant !== restaurant.id) {
                Alert.alert(
                    'Предупреждение',
                    "Вы пытаетесь добавить в корзину товар из другого ресторана, если вы его добавите то другие товары из корзины будут удалены. Очистить корзину?",
                    [
                        { text: 'Отмена', onPress: () => null },
                        {
                            text: 'Да',
                            onPress: claearShipments
                        },
                    ],
                    { cancelable: true },
                )
                return
            }
        }
        create({
            variables: {
                data: {
                    count: 1,
                    product: {
                        connect: { id: product.id }
                    },
                    user: user ? { connect: { id: user.id } } : undefined
                }
            }
        })
        dispatch({
            type: "addToCart",
            data: {
                id: new Date().getTime().toString(),
                count: 1,
                product: product.id,
                restaurant: restaurant.id
            }
        })
        toast.current.success("Товар добавлен")
    }

    return (
        <Button
            style={[styles.container, style]}
            onPress={() => rootNavigate("Product", { product, restaurant })}
        >
            <Image
                source={{ uri: imageUrl + product.image }}
                style={{
                    width: size,
                    height: size,
                    borderRadius: 12
                }}
                resizeMode="cover"
            />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>{product.price} ₽</Text>
            {
                inCart ? (
                    <Cuonter
                        cart={inCart}
                        style={[
                            styles.countContainer,
                            {
                                top: size - 21,
                            }
                        ]}
                        tintColor={COLORS.primary.white}
                        textStyle={{ marginHorizontal: 10 }}
                    />
                ) : (
                    <Button
                        onPress={addToCart}
                        style={
                            [
                                styles.addButton,
                                {
                                    top: size - 21,
                                    right: 8
                                }
                            ]
                        }
                        loading={loading || deleteLoading}
                    >
                        <Icon name="plus-circle" size={24} color={COLORS.primary.white} />
                    </Button>
                )
            }
        </Button >
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 0,
        height: 'auto',
        flexDirection: 'column',
        backgroundColor: COLORS.primary.white,
        borderRadius: 12,
        overflow: 'hidden'
    },
    name: {
        fontSize: 12,
        width: '100%',
        padding: 15,
    },
    price: {
        width: '100%',
        fontFamily: 'Montserrat-Bold',
        paddingTop: 0,
        padding: 15,
    },
    addButton: {
        width: 35,
        height: 35,
        padding: 0,
        borderRadius: 17,
        paddingHorizontal: 0,
        position: 'absolute'
    },
    countContainer: {
        right: 8,
        position: 'absolute',
        height: 35,
        backgroundColor: COLORS.primary.green,
        paddingHorizontal: 5,
        borderRadius: 17
    }
})