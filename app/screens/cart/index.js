import React, { useEffect, useMemo, useCallback } from 'react'
import {
    Dimensions,
    StyleSheet,
    BackHandler,
    View,
    ScrollView
} from 'react-native'
import { useQuery } from '@apollo/client'
import { useFocusEffect } from '@react-navigation/core'
import { DateTime } from 'luxon'

import {
    Empty,
    FlatList,
    statusBar,
    CartItem,
    Text,
    Button,
    toast,
    Product
} from '../../components'
import { rootNavigate } from '../../routes'
import { FIND_MANY_SHIPMENT, FIND_MANY_PRODUCT } from '../../gqls'
import { useStateValue } from '../../store'
import { COLORS } from '../../utils/const'
import { useUser } from '../../utils/hooks'

const { width } = Dimensions.get('screen')

const size = (width - 45) / 2.2

const Cart = ({ navigation }) => {

    const { user } = useUser()
    const { reducer } = useStateValue()
    const [state, _] = reducer
    const { products } = state

    const variables = useMemo(() => ({
        where: {
            id: { in: products.map(item => item.id) },
            delete: { equals: false }
        }
    }), [products])

    const { previousData, data, loading, error, refetch } = useQuery(FIND_MANY_SHIPMENT, {
        variables
    })

    const cart = useMemo(() => {
        if (data && data.findManyShipment) {
            return data.findManyShipment
        }
        if (previousData && previousData.findManyShipment) {
            return previousData.findManyShipment
        }
        return []
    }, [data, previousData])

    const restaurant = useMemo(() => cart.length > 0 ? cart[0].product.restaurant : null, [cart])

    const nowTime = useMemo(() => new DateTime.now().set({ day: 1, month: 1, year: 1970 }), [restaurant])
    const openExist = useMemo(() => restaurant && restaurant.addresses.length > 0 && restaurant.addresses.find(address => address.allTime || (nowTime < new DateTime.fromISO(address.endWorkAt) && nowTime > new DateTime.fromISO(address.startWorkAt))), [nowTime, restaurant])

    const amount = useMemo(() => cart.reduce((acc, item) => {
        acc = acc + (item.count * item.product.price)
        return acc
    }, 0), [cart])

    const isEnaugt = useMemo(() => restaurant ? amount >= restaurant.minimumOrderAmount : false, [amount, restaurant])

    const productsVariables = useMemo(() => ({
        where: {
            id: { notIn: products.map(item => item.product) },
            restaurantId: { equals: restaurant ? restaurant.id : '' },
            delete: { equals: false },
            publish: { equals: true },
        }
    }), [restaurant, products])

    const { data: recommendData, previousData: recommendPrevData } = useQuery(FIND_MANY_PRODUCT, {
        variables: productsVariables
    })

    const recommendations = useMemo(() => {
        if (recommendData && recommendData.findManyProduct) {
            return recommendData.findManyProduct
        }
        if (recommendPrevData && recommendPrevData.findManyProduct) {
            return recommendPrevData.findManyProduct
        }
        return []
    }, [recommendData, recommendPrevData])


    useFocusEffect(() => {
        statusBar.current.setBarStyle("dark-content")
        statusBar.current.setBackground(COLORS.secondary.white)
    })

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton)
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    }, [])

    const handleBackButton = () => {
        navigation.navigate("HomeStack")
        return true
    }

    const keyExtractor = useCallback((item, index) => item.id, [])

    const renderItem = useCallback(({ item, index }) => (
        <View style={{ width: width - 30, marginBottom: 15 }}>
            <CartItem item={item} />
        </View>
    ), [])

    const orderIt = () => {
        if (!openExist) {
            return toast.current.info("Ресторан закрылся")
        }
        if (isEnaugt) {
            if (!user) {
                navigation.navigate('Login')
            } else {
                navigation.navigate("CreateOrder", {
                    amount,
                    addresses: restaurant.addresses,
                    selectedAddress: restaurant.addresses.length > 0 ? restaurant.addresses[0].value : null
                })
            }
        } else {
            toast.current.info("Минимальная стоимость заказа - " + restaurant.minimumOrderAmount)
        }
    }

    return (
        <>
            <FlatList
                data={cart}
                keyExtractor={keyExtractor}
                loading={loading}
                onRefresh={refetch}
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                ListEmptyComponent={
                    <Empty
                        text={error ? "Произошла ошибка, повторите попытку" : "Ваша корзина пуста. Добавьте что-нибудь из меню наших ресторанов"}
                        buttonText={error ? "Повторить" : "Выбрать ресторан"}
                        onButtonPress={error ? refetch : () => rootNavigate("HomeStack")}
                        style={{ paddingHorizontal: 15 }}
                    />
                }
                renderItem={renderItem}
                ListHeaderComponent={
                    restaurant ?
                        <Text style={styles.name}>{restaurant.name}</Text>
                        : null
                }
                ListHeaderComponentStyle={{
                    width: '100%',
                    marginBottom: 24,
                    alignItems: 'center'
                }}
                ListFooterComponent={
                    restaurant && recommendations.length > 0 ?
                        <>
                            <Text style={styles.title}>
                                {
                                    isEnaugt ? "Рекомендуем" : `Закажите еще на ${restaurant.minimumOrderAmount - amount} ₽ для оформления заказа`
                                }
                            </Text>
                            <ScrollView
                                horizontal
                                style={styles.recommendations}
                                contentContainerStyle={{ marginHorizontal: 15, paddingRight: 15 }}
                                showsHorizontalScrollIndicator={false}
                            >
                                {
                                    recommendations.map(item => (
                                        <View key={item.id} style={styles.item}>
                                            <Product
                                                product={item}
                                                size={size}
                                                restaurant={restaurant}
                                            />
                                        </View>
                                    ))
                                }
                            </ScrollView>
                        </>
                        : null
                }
                ListFooterComponentStyle={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: 9
                }}
            />
            {
                cart.length > 0 ? (
                    <View style={styles.footer}>
                        <View>
                            <Text style={styles.amount}>{amount} ₽</Text>
                        </View>
                        <Button
                            text="Оформить"
                            onPress={orderIt}
                            style={[
                                styles.orderButton,
                                { backgroundColor: !isEnaugt ? COLORS.primary.gray : COLORS.primary.green }
                            ]}
                        />
                    </View>
                ) : null
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
    },
    contentContainer: {
        alignItems: 'center',
        paddingBottom: 15
    },
    name: {
        color: COLORS.primary.gray,
        width: width - 30
    },
    footer: {
        width,
        backgroundColor: COLORS.primary.white,
        padding: 15,
        paddingBottom: 24,
        flexDirection: 'row',
    },
    orderButton: {
        flex: 1,
        width: 'auto',
        marginLeft: 24
    },
    amount: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20
    },
    recommendations: {
        width: '100%'
    },
    item: {
        width: size,
        marginRight: 15
    },
    title: {
        fontSize: 20,
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-Bold',
        width: '100%',
        marginBottom: 15,
        width: width - 30
    },
})

export default Cart