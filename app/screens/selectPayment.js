import React from "react"
import {
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native'
import { useFocusEffect } from "@react-navigation/core"

import {
    Animatedscreen,
    Text,
    statusBar,
    Button,
    Icon
} from "../components"
import { COLORS, PAYMENT_METHODS } from "../utils/const"

const { width, height } = Dimensions.get("window")

const SelectAddress = ({ navigation, route }) => {

    const { selectedMethod } = route.params

    const selectMethod = (method) => {
        navigation.navigate({
            name: "CreateOrder", 
            params: { paymentMethod: method },
            merge: true
        })
    }

    useFocusEffect(() => {
        statusBar.current.setBarStyle("light-content")
        statusBar.current.setBackground(COLORS.primary.black)
    })

    return (
        <Animatedscreen
            offset={height / 2.5}
            onBottomLimit={() => navigation.goBack()}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <Text style={styles.title}>Методы оплаты</Text>
                {
                    Object.keys(PAYMENT_METHODS).map((item) => (
                        <Button
                            key={item}
                            style={[
                                styles.item,
                                {
                                    borderColor: selectedMethod === item ? COLORS.primary.green : COLORS.primary.gray
                                }
                            ]}
                            onPress={() => selectMethod(item)}
                        >
                            <Text style={styles.itemText}>{PAYMENT_METHODS[item]}</Text>
                            {
                                selectedMethod === item ? (
                                    <Icon name="circle-check" size={23} color={COLORS.primary.green} />
                                ) : null
                            }
                        </Button>
                    ))
                }
            </ScrollView>
        </Animatedscreen>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: COLORS.primary.white
    },
    contentContainer: {
        alignItems: 'center',
        padding: 15,
        paddingTop: 0
    },
    label: {
        backgroundColor: COLORS.primary.white
    },
    title: {
        fontSize: 20,
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-Bold',
        width: '100%',
        marginBottom: 24
    },
    item: {
        backgroundColor: 'transparent',
        borderColor: COLORS.secondary.gray,
        borderWidth: 1,
        marginBottom: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemText: {
        color: COLORS.primary.black
    }
})

export default SelectAddress