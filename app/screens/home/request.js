import React, { useState } from 'react'
import {
    View,
    Dimensions,
    StyleSheet,
} from 'react-native'

import IMask from 'imask'

import { useMutation } from '@apollo/client'

import {
    Button,
    Animatedscreen,
    Text,
    Input,
    toast,
} from '../../components'

import { COLORS } from '../../utils/const'

import { SEND_REQUEST } from '../../gqls'

const { width, height } = Dimensions.get('screen')

const maskedPhone = IMask.createMask({
    mask: '+7 (000) 000-00-00'
})

const Request = ({ navigation }) => {
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')

    const [sendRequest] = useMutation(SEND_REQUEST, {
        onCompleted: async () => {
            toast.current.success('Заявка отправлена.')
            navigation.goBack()
        },
        onError: e => {
            toast.current.error('Что то пошло не так, повторите попытку позже.')
            navigation.goBack()
        }
    })

    const onSubmit = async () => {
        if (phone && name) {
            await sendRequest({
                variables: {
                    data: {
                        phone,
                        name
                    }
                }
            })
        } else {
            toast.current.error('Введите данные.')
        }
    }

    return (
        <Animatedscreen
            offset={15}
            closeOffset={height / 4}
            onBottomLimit={() => navigation.goBack()}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Заявка на добавления ресторана</Text>
                <Input
                    value={maskedPhone.resolve(phone)}
                    onChangeText={text => setPhone(text)}
                    placeholder='Ваш номер телефона'
                    label='Ваш номер телефона'
                    containerStyle={{ marginBottom: 12 }}
                    keyboardType='phone-pad'
                    returnKeyType='done'
                    maxLength={18}
                />
                <Input
                    value={name}
                    onChangeText={text => setName(text)}
                    placeholder='Название организации'
                    label='Название организации'
                    containerStyle={styles.input}
                    returnKeyType='done'
                />
                <Button
                    text='Отправить заявку'
                    style={{ width: '100%' }}
                    onPress={onSubmit}
                />
            </View>
        </Animatedscreen>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: COLORS.primary.white,
        paddingHorizontal: 15
    },
    title: {
        fontSize: 20,
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-Bold',
        width: '100%',
        marginBottom: 24
    },
    input: {
        marginBottom: 24
    }
})

export default Request