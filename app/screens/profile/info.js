import React from 'react'
import {
    View,
    Dimensions,
    StyleSheet
} from 'react-native'
import { useFocusEffect } from '@react-navigation/core'

import {
    Animatedscreen,
    Button,
    statusBar,
    Text
} from '../../components'

import { COLORS } from '../../utils/const'

const { width, height } = Dimensions.get('screen')

const Info = ({ navigation }) => {

    useFocusEffect(() => {
        statusBar.current.setBarStyle("light-content")
        statusBar.current.setBackground(COLORS.primary.black)
    })

    return (
        <Animatedscreen
            offset={height / 3}
            onBottomLimit={() => navigation.goBack()}
        >
            <View style={styles.container}>
                {/* <Text style={styles.title}>Адрес доставки</Text> */}
                <Text style={styles.title}>Что это?</Text>
                <Text style={styles.text}>Скидка на заказ еды</Text>
                <Text style={styles.title}>Как накопить?</Text>
                <Text style={styles.text}>За каждый 5-й успешно оформленный заказ мы даем скидку</Text>
                <Text style={styles.text}>Считаются только те заказы, которые были оплачены онлайн</Text>
                <Text style={styles.text}>Скидка работает только при оплате онлайн</Text>
                <Button
                    text="Понятно"
                    onPress={() => navigation.goBack()}
                />
            </View>
        </Animatedscreen>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        alignItems: 'center',
        padding: 15,
        paddingTop: 0
    },
    title: {
        fontSize: 20,
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-Bold',
        width: '100%',
        marginBottom: 24
    },
    text: {
        width: '100%',
        marginBottom: 24
    }
})

export default Info