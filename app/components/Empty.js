import React from 'react'
import {
    Dimensions,
    StyleSheet,
    Image,
    View,
} from 'react-native'

import {
    Text,
    Button
} from '.'

import { COLORS, IMAGES } from '../utils/const'

const { width } = Dimensions.get('screen')

export const Empty = ({
    text = "",
    onButtonPress,
    buttonText,
    style
}) => {

    return (
        <View style={[styles.container, style]}>
            <View style={styles.unit}>
                <Image
                    source={IMAGES.notAuth}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.text}>{text}</Text>
            </View>
            {
                onButtonPress && buttonText ? (
                    <Button
                        onPress={onButtonPress}
                        text={buttonText}
                    />
                ) : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
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
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})