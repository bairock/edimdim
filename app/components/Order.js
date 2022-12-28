import React, { useMemo } from 'react'
import {
    ScrollView,
    Dimensions,
    StyleSheet,
    Image,
    View,
} from 'react-native'
import { DateTime } from 'luxon'

import {
    Button,
    Text
} from '.'

import { rootNavigate } from '../routes'

import { COLORS } from '../utils/const'
import { imageUrl } from '../utils/endpoints'

const { width, height } = Dimensions.get('screen')

export const Order = ({ order, style }) => {

    const paymentStatus = useMemo(() => {
        let status = 'Оплата при получении'
        let color = COLORS.primary.green
        if (order.paymentMethod === 'online') {
            status = 'В обработке'
            color = COLORS.primary.gray
            if (order.paymentStatus.toLowerCase() === 'pending') {
                status = 'Не оплачено'
                color = COLORS.secondary.strongRed
            }
            if (order.paymentStatus === 'CONFIRMED') {
                status = 'Оплачено онлайн'
                color = COLORS.primary.green
            }
            if (paymentStatus === 'CANCELED' || paymentStatus === 'DEADLINE_EXPIRED' || paymentStatus === 'REJECTED') {
                status = 'Ошибка оплаты'
                color = COLORS.secondary.red
            }
            if (paymentStatus === 'NEW') {
                status = 'Ожидает списание'
                color = COLORS.primary.gray
            }
        }
        return <Text style={[styles.paymentType, { color }]}>{status}</Text>
    }, [order])

    const orderStatus = useMemo(() => {
        let status = 'Новый'
        let color = COLORS.primary.gray
        let background = COLORS.secondary.white
        if (order.orderStatus === 'confirmed') {
            status = 'Подтверждено'
            color = COLORS.primary.white
            background = COLORS.primary.green
        }
        if (order.orderStatus === 'done') {
            status = 'Доставлен'
            color = COLORS.primary.white
            background = COLORS.primary.green
        }
        if (order.orderStatus === 'canceled') {
            status = 'Отменён'
            color = COLORS.secondary.red
            background = COLORS.secondary.softRed
        }
        return (
            <View style={[styles.statusContainer, { backgroundColor: background }]}>
                <Text style={[styles.status, { color }]}>{status}</Text>
            </View>
        )
    }, [order])

    if (!order) {
        return null
    }

    return (
        <Button
            style={[styles.container, style]}
            onPress={() => rootNavigate("SingleOrder", { order })}
        >
            <View style={styles.row}>
                <Image
                    source={{ uri: imageUrl + order.restaurant.logo }}
                    resizeMode="cover"
                    style={styles.logo}
                />
                <View style={styles.info}>
                    <View style={[styles.row, { justifyContent: 'space-between' }]}>
                        <Text style={styles.resturanName}>{order.restaurant.name}</Text>
                        {orderStatus}
                    </View>
                    <Text style={styles.date}>{DateTime.fromISO(order.createdAt).toFormat("dd.MM.yyyy HH:mm")}</Text>
                </View>
            </View>
            <ScrollView
                style={styles.products}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View
                    onStartShouldSetResponder={() => true}
                    style={[styles.row, styles.productsContainer]}
                >
                    {
                        order.shipments.map((item, index) => (
                            <View
                                key={item.id}
                            >
                                <Image
                                    source={{ uri: imageUrl + item.product.image }}
                                    style={[styles.productImage, index + 1 == order.shipments.length ? { marginRight: 0 } : null]}
                                    resizeMode="cover"
                                />
                                {/* <View style={styles.productCountCountainer}>
                                    <Text numberOfLines={1} style={styles.productCount}>x2</Text>
                                </View> */}
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
                {paymentStatus}
                <Text style={styles.total}>Итого: <Text>{order.amount} ₽</Text></Text>
            </View>
        </Button>
    )
}

const size = width / 8

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        backgroundColor: COLORS.primary.white,
        flexDirection: 'column',
        padding: 15,
        paddingHorizontal: 15,
        borderRadius: 10
    },
    row: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    logo: {
        width: size,
        height: size,
        borderRadius: 12,
    },
    info: {
        flex: 1,
        marginLeft: 15,
    },
    date: {
        color: COLORS.primary.gray,
        fontSize: 12,
        marginTop: 5,
        fontFamily: 'Montserrat-SemiBold',
    },
    resturanName: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
    },
    statusContainer: {
        padding: 5,
        backgroundColor: COLORS.secondary.white,
        borderRadius: 4,
        marginLeft: 8
    },
    status: {
        color: COLORS.primary.gray,
        fontSize: 10,
        fontFamily: 'Montserrat-SemiBold',
    },
    products: {
        width: '100%',
    },
    productsContainer: {
        paddingVertical: 10
    },
    productImage: {
        width: size,
        height: size,
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 15
    },
    paymentType: {
        color: COLORS.primary.green,
        fontSize: 12
    },
    total: {
        color: COLORS.primary.gray,
        fontSize: 12
    },
    productCountCountainer: {
        backgroundColor: COLORS.secondary.white,
        borderRadius: 5,
        position: 'absolute',
        right: 5,
        top: -10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    productCount: {
        fontSize: 10,
        fontFamily: 'Montserrat-Bold',
    }
})