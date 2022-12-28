import React from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    StatusBar
} from 'react-native'

import {
    Empty
} from '../../components'

import { rootNavigate } from '../../routes'

import { COLORS, IMAGES } from '../../utils/const'

const { width } = Dimensions.get('screen')

const Notauth = ({ user }) => {

    const navigate = () => {
        if (user) {
            return rootNavigate("Registration")
        }
        rootNavigate("Login")
    }

    const text = user ?
        "Зарегистрируйтесь, чтобы управлять данными и сделать свой первый заказ в Е-димдим" :
        "Войдите в профиль, чтобы управлять данными и сделать свой первый заказ в Е-димдим"

    return (
        <View
            style={styles.container}
        >
            <StatusBar
                barStyle="dark-content"
                backgroundColor={COLORS.secondary.white}
            />
            <View />
            <Empty
                text={text}
                buttonText={user ? "Зарегистрироваться" : "Войти"}
                onButtonPress={navigate}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },
    image: {
        width: '100%',
        height: 200
    },
    text: {
        fontSize: 14,
        color: COLORS.primary.black,
        lineHeight: 22,
        textAlign: 'center'
    },
    unit: {
        width: '100%',
        alignItems: 'center'
    }
})

export default Notauth