import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    Platform,
    Keyboard
} from 'react-native'
import IMask from 'imask'
import { useMutation } from '@apollo/client'

import {
    Button,
    Text,
    Icon,
    Input,
    toast,
    KeyboardAvoidingView
} from '../../components'

import {
    CREATE_ONE_ORDER, FIND_MANY_ORDER
} from '../../gqls'

import { rootNavigate } from '../../routes'
import { useStateValue } from '../../store'
import { COLORS, IMAGES, PAYMENT_METHODS } from '../../utils/const'
import { useUser } from '../../utils/hooks'
import { variables as listVariables } from '.'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const { width } = Dimensions.get("window")
const { white, gray, green } = COLORS.primary

const maskedPhone = IMask.createMask({
    mask: '+7 (000) 000-00-00'
})

const CreateOrder = ({ route, navigation }) => {

    const { amount, paymentMethod, addresses: _addresses } = route.params
    const scroll = useRef()
    const { user } = useUser()
    const { reducer } = useStateValue()
    const [state, dispatch] = reducer
    const [deliveryMethod, setDeliveryMethod] = useState("delivery") // pickup
    const refs = useRef(new Map()).current
    const [editable, setEditable] = useState(false)
    const [save, setSave] = useState(false)
    const [phone, setPhone] = useState(maskedPhone.resolve(user.phone))
    const [comment, setComment] = useState("")

    const [create, { loading }] = useMutation(CREATE_ONE_ORDER, {
        onCompleted: ({ createOneOrder }) => {
            if (createOneOrder.order.paymentMethod === 'online') {
                navigation.replace('Payment', { uri: createOneOrder.payment })
            } else {
                navigation.navigate('OrderStack')
            }
            dispatch({
                type: 'setCart',
                data: []
            })
        },
        onError: e => {
            toast.current.error("Что то пошло не так, повторите попытку позже.")
        },
        update: (client, { data: { createOneOrder } }) => {
            const prevData = client.readQuery({
                query: FIND_MANY_ORDER,
                variables: listVariables,
            })
            if (prevData) {
                const { findManyOrder } = prevData
                client.writeQuery({
                    query: FIND_MANY_ORDER,
                    variables: listVariables,
                    data: {
                        findManyOrder: [createOneOrder.order, ...findManyOrder]
                    }
                })
            }
        }
    })

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        return () => {
            dispatch({
                type: 'setAddress',
                data: user.addresses.length > 0 ? user.addresses[0] : null
            })
            showSubscription.remove()
        }
    }, [])

    const keyboardDidShow = useCallback(() => {
        scroll.current.scrollToEnd({ animated: true })
    }, [scroll])

    useEffect(() => {
        if (editable) {
            refs.get("phone").focus()
        }
    }, [editable])

    const addresses = useMemo(() => deliveryMethod === 'delivery' ? [] : _addresses.map(item => item.value), [deliveryMethod])

    useEffect(() => {
        if (deliveryMethod === 'delivery') {
            dispatch({
                type: 'setAddress',
                data: user && user.addresses.length > 0 ? user.addresses[0] : ''
            })
        } else {
            dispatch({
                type: 'setAddress',
                data: addresses[0]
            })
        }
    }, [deliveryMethod])

    const createOrder = () => {
        if (!state.address) {
            return toast.current.info("Введите адрес")
        }
        create({
            variables: {
                data: {
                    deliveryMethod,
                    paymentMethod,
                    address: state.address,
                    name: user.name,
                    phone,
                    comment
                }
            }
        })
    }

    const setDelivery = (method) => {
        if (method === 'pickup') {
            if (_addresses.length === 0) {
                return toast.current.info("Ресторан занимается только доставкой")
            }
        }
        setDeliveryMethod(method)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? "padding" : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView
                ref={scroll}
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.switch}>
                    <Button
                        text="Доставка"
                        onPress={() => setDelivery("delivery")}
                        style={[
                            styles.switchButton,
                            {
                                backgroundColor: deliveryMethod === 'delivery' ? green : white
                            }
                        ]}
                        textStyle={{
                            color: deliveryMethod === 'delivery' ? white : gray
                        }}
                    />
                    <Button
                        text="Самовывоз"
                        onPress={() => setDelivery("pickup")}
                        style={[
                            styles.switchButton,
                            {
                                backgroundColor: deliveryMethod === 'pickup' ? green : white
                            }
                        ]}
                        textStyle={{
                            color: deliveryMethod === 'pickup' ? white : gray
                        }}
                    />
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{deliveryMethod === "pickup" ? "Откуда забрать?" : "Куда доставить"}</Text>
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <Image
                                source={IMAGES.home}
                            />
                            <Text style={styles.address}>{state.address ? state.address : 'Укажите адрес'}</Text>
                        </View>
                        <Button
                            style={styles.arrowButton}
                            onPress={() => rootNavigate("SelectAddress", { addresses })}
                        >
                            <Icon
                                name="arrow-right"
                                size={18}
                                color={white}
                            />
                        </Button>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <Image
                                source={IMAGES.phone}
                            />
                            <Input
                                value={phone}
                                onChangeText={text => setPhone(maskedPhone.resolve(text))}
                                ref={ref => refs.set("phone", ref)}
                                placeholder="Номер телефона"
                                style={styles.phoneInput}
                                containerStyle={styles.phone}
                                editable={editable}
                                onSubmitEditing={() => setEditable(false)}
                                returnKeyType="done"
                                disabledStyle={{ color: COLORS.primary.black }}
                                onBlur={() => setEditable(false)}
                                keyboardType="phone-pad"
                            />
                        </View>
                        <Button
                            style={styles.arrowButton}
                            onPress={() => setEditable(true)}
                        >
                            <Icon
                                name="edit"
                                size={18}
                                color={white}
                            />
                        </Button>
                    </View>
                    {/* <Text style={styles.title}>Оплата</Text>
                    <View style={styles.row}>
                        <Button
                            style={styles.payment}
                            onPress={() => rootNavigate("SelectPayment", { selectedMethod: paymentMethod })}
                        >
                            <Text>{PAYMENT_METHODS[paymentMethod]}</Text>
                            <Icon
                                name="arrow-down"
                                style={{ marginRight: 10 }}
                                size={18}
                            />
                        </Button>
                    </View> */}
                    <View style={styles.row}>
                        <Text>Стоимость</Text>
                        <Text>{amount} ₽</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Скидка</Text>
                        <Text>0 ₽</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.total}>Итого</Text>
                        <Text style={styles.total}>{amount} ₽</Text>
                    </View>
                    <Text style={styles.title}>Комментарий</Text>
                    <Input
                        value={comment}
                        placeholder="Оставить у двери"
                        onChangeText={text => setComment(text)}
                    />
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableWithoutFeedback onPress={() => setSave(!save)}>
                    <View style={[styles.footerRow, { marginBottom: 10 }]}>
                        <View style={styles.circle}>
                            {
                                save ? (
                                    <View style={styles.circleInside} />
                                ) : null
                            }
                        </View>
                        <Text style={styles.text}>Сохранить данные платежа</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.footerRow}>
                    <Text style={[styles.title, { width: 'auto', marginBottom: 0 }]}>
                        {amount} ₽
                    </Text>
                    <Button
                        text={paymentMethod === 'offline' ? "Оформить" : "Оплатить"}
                        // text="Заказать"
                        style={{ flex: 1, marginLeft: 15 }}
                        onPress={createOrder}
                        loading={loading}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width,
    },
    contentContainer: {
        alignItems: 'center',
        paddingBottom: 100
    },
    switch: {
        width: width - 30,
        alignSelf: 'center',
        padding: '1%',
        flexDirection: 'row',
        backgroundColor: COLORS.primary.white,
        justifyContent: 'space-between',
        borderRadius: 10
    },
    switchButton: {
        width: '50%'
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 15
    },
    title: {
        fontSize: 20,
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-Bold',
        width: '100%',
        marginBottom: 24
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    address: {
        marginLeft: 15,
        maxWidth: width / 1.5
    },
    arrowButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        paddingHorizontal: 0
    },
    phone: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        marginLeft: 15,
        maxWidth: width / 1.5
    },
    phoneInput: {
        paddingHorizontal: 0,
    },
    payment: {
        borderWidth: 0.5,
        borderColor: '#B5B8B6',
        borderRadius: 12,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    total: {
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
    },
    footer: {
        width,
        padding: 15,
        position: 'absolute',
        bottom: 0,
        backgroundColor: COLORS.primary.white,
        elevation: 10,
    },
    footerRow: {
        width: "100%",
        flexDirection: 'row'
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.primary.green,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleInside: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: COLORS.primary.green,
    }
})

export default CreateOrder