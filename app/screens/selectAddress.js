import React, { useMemo } from "react"
import {
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native'
import { useFocusEffect } from "@react-navigation/core"

import {
    Address,
    Animatedscreen,
    Text,
    statusBar,
    Button
} from "../components"
import { useStateValue } from "../store"
import { COLORS } from "../utils/const"
import { useUser } from "../utils/hooks"

const { width, height } = Dimensions.get("window")

const SelectAddress = ({ navigation, route }) => {

    const { addresses } = route.params
    const { user } = useUser()
    const { reducer } = useStateValue()
    const [state, dispatch] = reducer

    const addressesData = useMemo(() => {
        if (addresses.length > 0) {
            return addresses
        }
        if (user) {
            return user.addresses
        }
        return []
    }, [addresses, user])

    const selectAddress = (item) => {
        dispatch({
            type: 'setAddress',
            data: item
        })
        navigation.goBack()
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
                <Text style={styles.title}>Адреса доставки</Text>
                {
                    addressesData.map((item, index) => (
                        <Address
                            key={index}
                            item={item}
                            labelStyle={styles.label}
                            onPressAddress={() => selectAddress(item)}
                            itemStyle={{
                                borderColor: item === state.address ? COLORS.primary.green : undefined
                            }}
                            selectedAddress={state.address}
                        />
                    ))
                }
                {addresses.length === 0 ? (
                    <Button
                        text="Новый адрес"
                        onPress={() => {
                            navigation.goBack()
                            setTimeout(() => navigation.navigate("Address"), 0)
                        }}
                    />
                ) : null}
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
})

export default SelectAddress