import React, { useState, useMemo } from 'react'
import {
    ScrollView,
    Dimensions,
    StyleSheet,
    StatusBar,
    View,
    Linking,
} from 'react-native'
import IMask from 'imask'
import { useMutation } from '@apollo/client'
import { useFocusEffect } from '@react-navigation/core'

import {
    Text,
    Button,
    Input,
    toast,
    statusBar,
    KeyboardAvoidingView
} from '../../components'

import { SEND_USER_PHONE } from '../../gqls'

import { COLORS } from '../../utils/const'

const { width } = Dimensions.get('screen')

const maskedPhone = IMask.createMask({
    mask: '+7 (000) 000-00-00'
})

const Login = ({ navigation }) => {
    const [phone, setPhone] = useState('')
    const phoneString = useMemo(() => phone.replace(/[()+ -]/g, ''), [phone])
    const variables = useMemo(() => ({
        data: { phone: phoneString }
    }), [phoneString])

    useFocusEffect(() => {
        statusBar.current.setBarStyle("dark-content")
        statusBar.current.setBackground(COLORS.secondary.white)
    })

    const [sendPhone, { loading }] = useMutation(SEND_USER_PHONE, {
        variables,
        onCompleted: () => {
            toast.current.success("Сообщение отправлено")
            navigation.replace("LoginConfirm", { phone: phoneString })
        },
        onError: e => {
            toast.current.error("Что то пошло не так, повторите попытку позже.")
        }
    })

    const submit = () => {
        if (phoneString.length !== 11) {
            return toast.current.info("Введите номер телефона")
        }
        sendPhone()
    }

    const openPolicy = () => {
        Linking.openURL('https://edimdim.ru/policy')
    }
    const openTerms = () => {
        Linking.openURL('https://edimdim.ru/terms')
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
        >
            <StatusBar
                barStyle="dark-content"
                backgroundColor={COLORS.secondary.white}
            />
            <View style={styles.unit}>
                <Text style={styles.title}>Добро пожаловать</Text>
                <Text style={styles.subtitle}>Введите номер телефона, чтобы войти или зарегистрироваться</Text>
                <Input
                    value={maskedPhone.resolve(phone)}
                    onChangeText={text => setPhone(text)}
                    placeholder="Номер телефона"
                    label="Номер телефона"
                    autoFocus={false}
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    onSubmitEditing={submit}
                    maxLength={18}
                    containerStyle={styles.input}
                    labelContainerStyle={styles.labelContainerStyle}
                />
                <Text style={styles.note}>
                    Нажимая кнопку продолжить, Вы соглашаетесь с <Text onPress={openPolicy} style={{ textDecorationLine: "underline" }}>Обработкой персональных данных</Text> и <Text onPress={openTerms} style={{ textDecorationLine: "underline" }}>Пользовательским соглашением</Text>
                    {/* Продолжая, Вы соглашайтесь с <Text onPress={openPolicy} style={{ textDecorationLine: "underline" }}>обработкой персональных данных</Text> и <Text onPress={openPolicy} style={{ textDecorationLine: "underline" }}>Пользовательским соглашением</Text> */}
                </Text>
            </View>
            <KeyboardAvoidingView>
                <Button
                    text="Продолжить"
                    disabled={phoneString.length !== 11}
                    onPress={submit}
                    loading={loading}
                />
            </KeyboardAvoidingView>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },
    unit: {
        width: '100%',
    },
    title: {
        fontSize: 20,
        color: COLORS.primary.black,
        marginBottom: 15,
        width: '100%',
        fontFamily: "Montserrat-Bold"
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.primary.black,
        marginBottom: 24,
        width: '100%'
    },
    input: {
        marginBottom: 24
    },
    note: {
        fontSize: 10,
        color: COLORS.primary.gray,
        marginBottom: 24,
        width: '100%'
    },
    labelContainerStyle: {
        backgroundColor: COLORS.secondary.white
    },
    wrapper: {
        flex: 1,
        width: '100%',
    }
})

export default Login