import React, { useState, useMemo } from 'react'
import {
    ScrollView,
    Dimensions,
    StyleSheet,
    StatusBar,
    RefreshControl,
    Alert
} from 'react-native'
import IMask from 'imask'
import { useFocusEffect } from '@react-navigation/core'

import {
    Text,
    Input,
    Button,
    Icon,
    toast,
    Address,
    statusBar
} from '../../components'
import NotAuth from './notAuth'

import { UPDATE_ONE_USER, SEND_USER_PHONE } from '../../gqls'

import { COLORS } from '../../utils/const'
import { useUser } from '../../utils/hooks'
import { useMutation } from '@apollo/client'

const { width } = Dimensions.get('screen')

const maskedPhone = IMask.createMask({
    mask: '+7 (000) 000-00-00'
})

const Index = ({ navigation }) => {

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const nameString = useMemo(() => name.replace(/[^\w[А-я]+/gi, ''), [name])
    const phoneString = useMemo(() => phone.replace(/[()+ -]/g, ''), [phone])

    useFocusEffect(() => {
        statusBar.current.setBarStyle("dark-content")
        statusBar.current.setBackground(COLORS.secondary.white)
    })
    
    const { user, loading, refetch } = useUser({
        onCompleted: ({ findMeUser }) => {
            if (findMeUser) {
                if (findMeUser.name) {
                    setName(findMeUser.name)
                }
                setPhone(findMeUser.phone)
            }
        }
    })

    const variables = useMemo(() => ({
        where: { id: user ? user.id : "" },
        data: {
            name: { set: name },
            phone: { set: phoneString }
        }
    }), [name, phoneString, user])

    const edited = useMemo(() => user && (user.name !== name || user.phone !== phoneString), [name, phoneString, user])

    const [update, { loading: updateLoading }] = useMutation(UPDATE_ONE_USER, {
        variables,
        onCompleted: () => {
            toast.current.success("Данные изменены")
        },
        onError: e => {
            toast.current.error("Что то пошло не так, повторите попытку позже.")
        }
    })

    const [sendPhone, { loading: phoneLoading }] = useMutation(SEND_USER_PHONE, {
        variables: { data: { phone: phoneString } },
        onCompleted: data => {
            toast.current.success("Сообщение отправлено")
            navigation.navigate("PhoneChange", { phone: phoneString, name })
        },
        onError: e => {
            for (let err of e.graphQLErrors) {
                if (err.message === 'exist') {
                    return toast.current.error("Пользователь с таким номером уже существует.")
                }
            }
            toast.current.error("Что то пошло не так, повторите попытку позже.")
        }
    })

    const updateProfile = () => {
        if (!nameString) {
            return toast.current.info("Введите ваше имя")
        }
        if (phoneString.length !== 11) {
            return toast.current.info("Введите номер телефона")
        }
        if (phone === phoneString) {
            update()
        } else {
            Alert.alert(
                'Изменить номер?',
                'Изменяя номер телефона, вы также меняете номер входа в ваш аккаунт. На новый номер будет отправлено СМС сообщение с кодом подтверждения',
                [
                    { text: 'Отмена', onPress: () => null },
                    {
                        text: 'Да',
                        onPress: async () => {
                            sendPhone()
                        }
                    },
                ],
                { cancelable: false }
            )
        }
    }

    if ((!user || !user.name) && !loading) {
        return <NotAuth user={user} />
    }

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={COLORS.secondary.white}
            />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={refetch}
                    />
                }
            >
                {
                    !loading ? (
                        <>
                            <Text style={styles.title}>Личная информация</Text>
                            <Input
                                value={name}
                                placeholder="Введите имя"
                                label="Введите имя"
                                onChangeText={text => setName(text)}
                                containerStyle={styles.input}
                                labelContainerStyle={styles.label}
                                onSubmitEditing={updateProfile}
                                returnKeyType="done"
                            />
                            <Input
                                value={maskedPhone.resolve(phone)}
                                placeholder="Введите номер телефона"
                                label="Введите номер телефона"
                                onChangeText={text => setPhone(text)}
                                containerStyle={styles.input}
                                labelContainerStyle={styles.label}
                                keyboardType="phone-pad"
                                maxLength={18}
                                onSubmitEditing={updateProfile}
                                returnKeyType="done"
                            />
                            <Text style={styles.title}>Мои адреса</Text>
                            {
                                user.addresses.map((item, index) => (
                                    <Address
                                        key={index}
                                        item={item} 
                                        onPressAddress={() => navigation.navigate("Address", { address: item })}
                                    />

                                ))
                            }
                            <Button
                                text="Добавить адрес"
                                style={styles.addAddress}
                                onPress={() => navigation.navigate("Address")}
                            >
                                <Icon
                                    name="plus-circle"
                                    size={25}
                                    color={COLORS.primary.green}
                                />
                                <Text style={styles.addAddressText}>Добавить адрес</Text>
                            </Button>
                            {/* <Text style={styles.title}>Скидки</Text>
                            <Button
                                activeOpacity={1}
                                text="До скидки еще 3 заказа"
                                style={styles.discount}
                                textStyle={styles.discountText}
                                onPress={() => navigation.navigate("Info")}
                            /> */}
                        </>
                    ) : null
                }
            </ScrollView>
            {
                edited ? (
                    <Button
                        text="Сохранить"
                        style={styles.save}
                        onPress={updateProfile}
                        loading={updateLoading || phoneLoading}
                    />
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
        padding: 15,
        paddingBottom: 74
    },
    title: {
        fontSize: 20,
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-Bold',
        width: '100%',
        marginBottom: 24
    },
    input: {
        marginBottom: 24,
    },
    addressItemConainer: {
        width: '100%'
    },
    addAddress: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 'auto',
        paddingHorizontal: 0,
        marginBottom: 24,
    },
    addAddressText: {
        color: COLORS.primary.green,
        fontFamily: 'Montserrat-Regular',
        marginLeft: 5
    },
    addressItem: {
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: '#B5B8B6',
        borderRadius: 12,
        marginBottom: 15
    },
    addressItemText: {
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-Regular'
    },
    discount: {
        backgroundColor: COLORS.secondary.gray
    },
    discountText: {
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-Bold',
        fontSize: 16
    },
    label: {
        backgroundColor: COLORS.secondary.white
    },
    save: {
        position: 'absolute',
        bottom: 15,
        alignSelf: 'center',
        width: width - 30
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

export default Index