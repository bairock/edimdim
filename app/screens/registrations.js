import React, { useState, useMemo } from 'react'
import {
    ScrollView,
    Dimensions,
    StyleSheet,
    StatusBar,
    View
} from 'react-native'
import { useMutation } from '@apollo/client'

import {
    Text,
    Button,
    Input,
    toast,
    KeyboardAvoidingView
} from '../components'

import { UPDATE_ONE_USER } from '../gqls'

import { COLORS } from '../utils/const'
import { useUser } from '../utils/hooks'

const { width } = Dimensions.get('screen')

const Registration = ({ navigation }) => {
    const [name, setName] = useState('')
    const { user } = useUser()
    const nameString = useMemo(() => name.replace(/[^\w[А-я]+/gi, ''), [name])
    const variables = useMemo(() => ({
        where: { id: user ? user.id : '' },
        data: {
            name: { set: name }
        }
    }), [name, user])

    const [update, { loading }] = useMutation(UPDATE_ONE_USER, {
        variables,
        onCompleted: data => {
            toast.current.success("Данные сохранены")
            navigation.navigate("TabBar")
        },
        onError: e => {
            toast.current.error("Что то пошло не так, повторите попытку позже.")
        }
    })

    const submit = () => {
        if (!nameString) {
            return toast.current.info("Введите ваше имя")
        }
        update()
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
                <Text style={styles.title}>Давайте знакомиться!</Text>
                <Text style={styles.subtitle}>Чтобы завершить регистрацию, укажите ваше имя</Text>
                <Input
                    value={name}
                    onChangeText={text => setName(text)}
                    placeholder="Имя"
                    label="Имя"
                    labelContainerStyle={styles.labelContainerStyle}
                    autoFocus={false}
                    returnKeyType="done"
                    onSubmitEditing={submit}
                    maxLength={18}
                    containerStyle={styles.input}
                />
            </View>
            <KeyboardAvoidingView>
                <Button
                    text="Сохрнаить"
                    disabled={!nameString}
                    onPress={submit}
                    loading={loading}
                />
            </KeyboardAvoidingView>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },
    unit: {
        width: '100%'
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
    labelContainerStyle: {
        backgroundColor: COLORS.secondary.white
    }
})

export default Registration