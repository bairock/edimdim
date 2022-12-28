import React, { useMemo } from 'react'
import {
    View,
    Dimensions,
    StyleSheet
} from 'react-native'

import { Text, Icon } from '.'

import { COLORS } from '../utils/const'

const { width, height } = Dimensions.get('screen')

const radius = width / 8
const secondRadius = radius * 2.5
const secondRadiusInside = secondRadius * 0.5

export const OrderStatus = ({ status }) => {

    const orderStatus = useMemo(() => {
        let title = 'Заказ создан'
        let text = 'Мы свяжемся с вами для подтверждения заказа'
        let secondColor = COLORS.primary.gray
        let color = COLORS.secondary.gray
        let textColor = COLORS.primary.gray
        let icon = 'plus-circle'
        let iconColor = COLORS.primary.white
        if (status === 'confirmed') {
            title = 'Заказ принят'
            text = "Доставим как можно скорее"
            color = COLORS.secondary.green
            secondColor = COLORS.primary.green
            textColor = COLORS.primary.green
            icon = 'car'
            iconColor = COLORS.primary.white
        }
        if (status === 'done') {
            title = "Заказ выполнен"
            text = 'Пожалуйста оцените качество обслуживания'
            color = COLORS.secondary.green
            secondColor = COLORS.primary.green
            textColor = COLORS.primary.green
            icon = 'circle-check'
            iconColor = COLORS.primary.white
        }
        if (status === 'canceled') {
            title = 'Заказ отменен'
            text = 'Похоже, что вы отменили заказ. Если это не так, свяжитесь с рестораном для уточнения'
            color = COLORS.secondary.red
            secondColor = COLORS.secondary.strongRed
            textColor = COLORS.primary.white
            icon = 'close'
            iconColor = COLORS.primary.white
        }
        return {
            title,
            text,
            color,
            secondColor,
            textColor,
            icon,
            iconColor
        }
    }, [status])

    return (
        <View style={styles.statusContainer}>
            <View style={[styles.circle, { backgroundColor: orderStatus.secondColor }]}>
                <Icon
                    name={orderStatus.icon}
                    color={orderStatus.iconColor}
                    size={radius / 1.5}
                />
            </View>
            <View style={[styles.statusInfo, { backgroundColor: orderStatus.color }]}>
                <Text style={[styles.statusTitle, { color: orderStatus.textColor }]}>{orderStatus.title}</Text>
                <Text style={[styles.statusText, { color: orderStatus.textColor }]}>{orderStatus.text}</Text>
                <View style={[
                    styles.secondCircle,
                    {
                        bottom: -(secondRadius / 2),
                        left: -(secondRadius / 2),
                        backgroundColor: orderStatus.secondColor
                    }
                ]}>
                    <View style={[styles.secondCircleInside, { backgroundColor: orderStatus.color }]} />
                </View>
                <View style={[
                    styles.secondCircle,
                    {
                        top: -(secondRadius / 2),
                        right: -(secondRadius / 2),
                        backgroundColor: orderStatus.secondColor
                    }
                ]}>
                    <View style={[styles.secondCircleInside, { backgroundColor: orderStatus.color }]} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    statusContainer: {
        width: '100%',
    },
    circle: {
        backgroundColor: COLORS.primary.gray,
        width: radius,
        height: radius,
        borderRadius: radius / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -radius / 2,
        marginLeft: radius / 2,
        zIndex: 1,
    },
    secondCircle: {
        width: secondRadius,
        height: secondRadius,
        borderRadius: secondRadius / 2,
        backgroundColor: COLORS.primary.gray,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    statusInfo: {
        backgroundColor: COLORS.secondary.gray,
        width: '100%',
        padding: 15,
        borderRadius: 12,
        overflow: 'hidden',
        paddingHorizontal: (radius * 3 / 2) + 7,
        minHeight: height / 10
    },
    secondCircleInside: {
        backgroundColor: COLORS.secondary.gray,
        width: secondRadiusInside,
        height: secondRadiusInside,
        borderRadius: (secondRadiusInside) / 2,
    },
    statusTitle: {
        width: '100%',
        color: COLORS.primary.gray,
        marginBottom: 8
    },
    statusText: {
        width: '100%',
        fontSize: 10,
        color: COLORS.primary.gray
    }
})