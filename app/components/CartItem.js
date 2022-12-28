import React from "react"
import {
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'

import {
    Text,
    Cuonter
} from "."
import { COLORS } from "../utils/const"

import { imageUrl } from "../utils/endpoints"

const { width } = Dimensions.get("window")

export const CartItem = ({ item }) => {

    const {
        product,
        count,
    } = item

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
        >
            <Image
                source={{ uri: imageUrl + product.image }}
                style={styles.image}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{product.name}</Text>
                <Cuonter
                    cart={item}
                    style={styles.counter}
                    size={25}
                    textStyle={{ marginHorizontal: 10 }}
                    tintColor={COLORS.primary.white}
                />
                {/* <View style={styles.countContainer}>
                    <Text style={styles.count}>{count} шт.</Text>
                </View> */}
            </View>
            <Text style={styles.price}>{product.price * count} ₽</Text>
        </TouchableOpacity>
    )
}

const size = width / 5

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row'
    },
    image: {
        width: size,
        height: size,
        borderRadius: 12,
    },
    info: {
        flex: 1,
        marginLeft: 15,
        height: '100%'
    },
    price: {
        fontSize: 14,
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-Bold'
    },
    name: {
        fontSize: 14,
        color: COLORS.primary.black,
        marginBottom: 5
    },
    countContainer: {
        width: 50,
        padding: 2,
        backgroundColor: COLORS.primary.green,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12
    },
    count: {
        color: COLORS.primary.white,
        fontSize: 12
    },
    counter: {
        maxWidth: "40%",
        padding: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        height: 'auto',
        borderRadius: 20,
        backgroundColor: COLORS.primary.green
    }
})