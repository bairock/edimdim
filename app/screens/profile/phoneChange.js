import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    ScrollView,
    Dimensions,
    StyleSheet,
    View,
    Keyboard,
    InteractionManager
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import IMask from 'imask'
import { DateTime } from 'luxon'
import { useApolloClient, useMutation } from '@apollo/client'

import {
    Text,
    Button,
    Input,
    toast
} from '../../components'

import { FIND_ME_USER, SEND_USER_CODE } from '../../gqls'

import { COLORS } from '../../utils/const'

const { width } = Dimensions.get('screen')

const maskedCode = IMask.createMask({
    mask: '0000'
})

const maskedPhone = IMask.createMask({
    mask: '+7 (000) 000-00-00'
})

let timerId

const PhoneChange = ({ navigation, route }) => {
    const now = DateTime.now()
    const { phone, name } = route.params
    const [code, setCode] = useState('')
    const [timer, setTimer] = useState(60)
    const client = useApolloClient()

    const inputRef = useRef()

    const variables = useMemo(() => ({
        data: {
            phone,
            code,
            name
        }
    }), [code])

    const [sendCode, { loading }] = useMutation(SEND_USER_CODE, {
        variables,
        onCompleted: async ({ sendUserCode }) => {
            const { user, token } = sendUserCode
            await AsyncStorage.setItem("token", token)
            await client.writeQuery({
                query: FIND_ME_USER,
                data: {
                    findMeUser: user
                }
            })
            toast.current.success("Двнные изменены")
            navigation.goBack()
        },
        onError: e => {
            for(let err of e.graphQLErrors){
                if (err.message === 'code incorrect'){
                    return toast.current.error("Неправильный код.")
                }
            }
            toast.current.error("Что то пошло не так, повторите попытку позже.")
        }
    })

    useEffect(() => {
        timerId = setInterval(tick, 1000)
        InteractionManager.runAfterInteractions(setFocus)
        const listrner = Keyboard.addListener('keyboardDidHide', setBlur)
        return () => {
            listrner.remove()
            clearInterval(timerId)
        }
    }, [])

    const tick = () => {
        const newDate = DateTime.now()
        const time = 60 - parseInt(newDate.diff(now).toFormat('ss'))
        if (time >= 0) {
            setTimer(time)
        } else {
            clearInterval(timerId)
        }
    }

    const arr = useMemo(() => {
        const res = new Array(4)
        const arr = Array.from(code)
        for (let i = 0; i < 4; i++) {
            res[i] = arr[i]
        }
        return res
    }, [code])

    const submit = () => {
        if (code.length !== 4) {
            return toast.current.info("Введите номер телефона")
        }
        sendCode()
    }

    const setFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    const setBlur = () => {
        if (inputRef.current) {
            inputRef.current.blur()
        }
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.unit}>
                <Text style={styles.title}>Введите код</Text>
                <Text style={styles.subtitle}>{`На номер ${maskedPhone.resolve(phone)} отправлено СМС с кодом.`}</Text>
                <Button onPress={setFocus} style={styles.codeContainer}>
                    {
                        arr.map((item, index) =>
                            item ? (
                                <Text key={index} style={styles.codeText}>{item}</Text>
                            ) : (
                                <View key={index} style={styles.dot} />
                            )
                        )
                    }
                </Button>
                <Input
                    ref={inputRef}
                    value={maskedCode.resolve(code)}
                    autoFocus={true}
                    onChangeText={text => setCode(text)}
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    onSubmitEditing={submit}
                    maxLength={4}
                    containerStyle={styles.input}
                />
            </View>
            <View style={styles.unit}>
                <Text style={styles.note}>Если код не придет, можно получить новый через {<Text style={{ color: COLORS.primary.green }}>{timer} сек.</Text>}</Text>
                <Button
                    text="Продолжить"
                    disabled={code.length !== 4}
                    onPress={submit}
                    loading={loading}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
    },
    contentContainer: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    unit: {
        width: '100%',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontFamily: "Montserrat-Bold",
        color: COLORS.primary.black,
        marginBottom: 15,
        width: '100%'
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.primary.black,
        marginBottom: 24,
        width: '100%'
    },
    input: {
        position: 'absolute',
        opacity: 0,
        height: 0,
    },
    note: {
        fontSize: 10,
        color: COLORS.primary.gray,
        marginBottom: 24,
        width: '100%',
    },
    codeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginBottom: 150,
        justifyContent: 'space-between',
        width: '50%'
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.primary.gray,
    },
    codeText: {
        fontSize: 16,
        color: COLORS.primary.black,
        fontWeight: '500',
        width: 12
    }
})

export default PhoneChange