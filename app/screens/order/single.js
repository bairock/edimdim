import React, { useMemo } from 'react'
import {
    ScrollView,
    Dimensions,
    StyleSheet,
    View,
    Image,
    Alert
} from 'react-native'
import { DateTime } from 'luxon'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'

import {
    Button,
    Text,
    OrderStatus,
    toast
} from '../../components'

import { UPDATE_ONE_ORDER, FIND_MANY_ORDER, FIND_FIRST_REVIEW, FIND_PAY_ORDER } from '../../gqls'

import { COLORS } from '../../utils/const'
import { imageUrl } from '../../utils/endpoints'

import { variables as listVariables } from '.'

const { width } = Dimensions.get('screen')

const Single = ({ route, navigation }) => {

    const { order } = route.params

    const [pay, { loading: payLoading }] = useLazyQuery(FIND_PAY_ORDER, {
        onCompleted: ({ findPayOrder }) => {
            navigation.navigate("Payment", { uri: findPayOrder })
        },
        onError: e => {
            toast.current.error("Что то пошло не так, повторите попытку позже.")
        },
        notifyOnNetworkStatusChange: true
    })

    const [udate, { loading }] = useMutation(UPDATE_ONE_ORDER, {
        onCompleted: () => {
            toast.current.success("Заказ отменён")
        },
        onError: e => {
            toast.current.error("Что то пошло не так, повторите попытку позже.")
        },
        update: async (client, { data: { updateOneOrder } }) => {
            const prevData = await client.readQuery({
                query: FIND_MANY_ORDER,
                variables: listVariables,
            })
            if (prevData) {
                const { findManyOrder } = prevData
                const newOrders = findManyOrder.map(item => {
                    if (item.id === updateOneOrder.id) {
                        return updateOneOrder
                    }
                    return item
                })
                await client.writeQuery({
                    query: FIND_MANY_ORDER,
                    variables: listVariables,
                    data: {
                        findManyOrder: newOrders
                    }
                })
                navigation.setParams({
                    order: updateOneOrder
                })
            }
        }
    })

    const { data, loading: reviewLoadin } = useQuery(FIND_FIRST_REVIEW, {
        variables: {
            where: {
                orderId: { equals: order.id }
            }
        }
    })

    const hasReview = data && data.findFirstReview

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
        return <Text style={[styles.label, { color }]}>{status}</Text>
    }, [order])

    const orderStatus = useMemo(() => {
        let status = 'Новый'
        let color = COLORS.primary.gray
        let background = COLORS.secondary.gray
        if (order.orderStatus === 'confirmed') {
            status = 'Подтверждено'
            color = COLORS.primary.white
            background = COLORS.primary.green
        }
        if (order.orderStatus === 'done') {
            status = 'Доставлен'
            color = COLORS.secondary.white
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

    const buttonData = useMemo(() => {
        let text = 'Заказ оформляется'
        let backgroundColor = COLORS.secondary.gray
        let color = COLORS.primary.gray
        let loadingColor = COLORS.secondary.gray
        if (order.orderStatus === 'confirmed') {
            text = 'Заказ подтвержден'
            color = COLORS.primary.gray
            backgroundColor = COLORS.secondary.gray
            loadingColor = COLORS.primary.gray
        }
        if (order.orderStatus === 'done') {
            text = 'Отзыв'
            color = COLORS.primary.white
            backgroundColor = COLORS.primary.green
            loadingColor = COLORS.primary.white
        }
        if (order.paymentStatus.toLowerCase() === 'pending') {
            text = 'Отменить заказ'
            color = COLORS.secondary.strongRed
            backgroundColor = COLORS.secondary.softRed
            loadingColor = COLORS.secondary.strongRed
        }
        if (order.orderStatus === 'canceled') {
            text = 'Заказ отменен'
            color = COLORS.primary.gray
            backgroundColor = COLORS.secondary.gray
            loadingColor = COLORS.primary.gray
        }
        return {
            text,
            backgroundColor,
            color,
            loadingColor
        }
    }, [order])

    const payOrder = () => {
        if (order.paymentStatus.toLowerCase() === "pending" && order.orderStatus !== 'canceled') {
            pay({
                variables: {
                    where: { uuid: order.uuid }
                }
            })
        }
    }

    const onPress = () => {
        if (order.paymentStatus.toLowerCase() === 'pending' && (order.orderStatus !== 'done' || order.orderStatus !== 'canceled')) {
            Alert.alert(
                'Отмен',
                'Отменить заказ?',
                [
                    { text: 'Отмена', onPress: () => null },
                    {
                        text: 'Да',
                        onPress: () => {
                            udate({
                                variables: {
                                    where: { id: order.id },
                                    data: {
                                        orderStatus: { set: 'canceled' }
                                    }
                                }
                            })
                        }
                    },
                ],
                { cancelable: false }
            )
            return
        }
        if (order.orderStatus === 'done') {
            navigation.navigate("AddReview", { order })
        }
    }

    const notPaid = useMemo(() => order.orderStatus === 'new' && order.paymentMethod === 'online' && order.paymentStatus.toLowerCase() === 'pending', [order])

    return (
        <>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <OrderStatus status={order.orderStatus} />
                <View style={styles.info}>
                    <View style={[styles.row, { alignItems: 'flex-start', marginBottom: 8 }]}>
                        <Image
                            source={{ uri: imageUrl + order.restaurant.logo }}
                            resizeMode="cover"
                            style={styles.logo}
                        />
                        <View style={styles.resturan}>
                            <View style={styles.row}>
                                <Text style={styles.resturanName}>{order.restaurant.name}</Text>
                                {orderStatus}
                            </View>
                            <Text style={styles.date}>{DateTime.fromISO(order.createdAt).toFormat("dd.MM.yyyy HH:mm")}</Text>
                        </View>
                    </View>
                    <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 8 }]}>
                        <Text style={styles.label}>Способ доставки</Text>
                        <Text style={styles.value}>{order.deliveryMethod === 'delivery' ? "Доставка" : "Смовывоз"}</Text>
                    </View>
                    <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 8 }]}>
                        <Text style={styles.label}>Адрес</Text>
                        <Text style={styles.value}>{order.address}</Text>
                    </View>
                    <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 8 }]}>
                        <Text style={styles.label}>Комментарий</Text>
                        <Text style={styles.value}>{order.comment ? order.comment : '-'}</Text>
                    </View>
                    <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 8 }]}>
                        {paymentStatus}
                        <Text style={[styles.value, { color: COLORS.primary.gray }]}>Итого: <Text>{order.amount} ₽</Text></Text>
                    </View>
                </View>
                {
                    order.shipments.map(item => (
                        <View key={item.id} style={[styles.row, { marginBottom: 15 }]}>
                            <Image
                                source={{ uri: imageUrl + item.product.image }}
                                style={styles.productImage}
                                resizeMode="cover"
                            />
                            <View style={styles.productIfno}>
                                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                                    <Text style={styles.productName}>{item.product.name}</Text>
                                    <Text style={styles.price}>{item.product.price} ₽</Text>
                                </View>
                                <View style={styles.countContainer}>
                                    <Text style={styles.count}>{item.count} шт.</Text>
                                </View>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
            {
                !reviewLoadin && orderStatus !== "done" && !hasReview ? (
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={onPress}
                            text={buttonData.text}
                            loading={loading}
                            style={{
                                backgroundColor: buttonData.backgroundColor,
                                // width: '100%',
                                width: notPaid ? '49%' : '100%'
                            }}
                            textStyle={{ color: buttonData.color }}
                            loadingColor={buttonData.loadingColor}
                        />
                        {
                            notPaid ? (
                                <Button
                                    text='Оплатить'
                                    loading={payLoading}
                                    style={{ width: '48%' }}
                                    onPress={payOrder}
                                />
                            ) : null
                        }
                    </View>
                ) : null
            }
        </>
    )
}

const size = width / 8

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
    },
    contentContainer: {
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    info: {
        width: '100%',
        padding: 15,
        backgroundColor: COLORS.primary.white,
        borderRadius: 12,
        marginVertical: 15
    },
    logo: {
        width: size,
        height: size,
        borderRadius: 12,
    },
    date: {
        color: COLORS.primary.gray,
        fontSize: 12,
        marginTop: 5,
        fontFamily: 'Montserrat-SemiBold',
    },
    resturan: {
        width: '100%',
        marginLeft: 15
    },
    resturanName: {
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
    },
    row: {
        width: '100%',
        flexDirection: 'row'
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
    label: {
        color: COLORS.primary.gray,
        fontSize: 12,
        textAlign: 'left',
        width: '48%'
    },
    value: {
        fontSize: 12,
        textAlign: 'right',
        width: '48%'
    },
    productImage: {
        width: width / 4,
        height: width / 4,
        borderRadius: 12
    },
    productIfno: {
        flex: 1,
        marginLeft: 15
    },
    price: {
        fontFamily: 'Montserrat-Bold',
    },
    productName: {
        flex: 1
    },
    countContainer: {
        backgroundColor: COLORS.primary.green,
        padding: 5,
        marginTop: 15,
        // flex: 'auto'
        // flexBasis: '0%'
        maxWidth: "20%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12
    },
    count: {
        color: COLORS.primary.white,
        fontSize: 12
    },
    buttonContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: COLORS.primary.white,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
    }
})

export default Single