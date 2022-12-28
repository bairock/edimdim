import { DateTime } from 'luxon'
import React from 'react'
import {
    ImageBackground,
    Dimensions,
    StyleSheet,
    View,
    Image,
    PixelRatio
} from 'react-native'

import {
    Button,
    Text
} from '.'

import { rootNavigate } from '../routes'

import { COLORS } from '../utils/const'
import { imageUrl } from '../utils/endpoints'

const { width, height } = Dimensions.get('screen')

export const Promotions = ({ promotion, style, imageRsize = 'cover' }) => {
    return (
        <ImageBackground
            source={{ uri: imageUrl + promotion.image }}
            style={[styles.container, style]}
            resizeMode={imageRsize}
        >
            <Button
                style={styles.mask}
                onPress={() => rootNavigate("SinglePromotions", { promotion })}
            >
                <View style={styles.info}>
                    <Image
                        source={{ uri: imageUrl + promotion.restaurant.logo }}
                        style={styles.logo}
                    />
                    <Text numberOfLines={2} style={styles.name}>{promotion.name}</Text>
                </View>
                <View style={styles.deadlineContainer}>
                    <Text style={styles.deadline}>до {new DateTime.fromISO(promotion.endAt).toFormat("dd.MM.yyyy, HH:mm")}</Text>
                </View>
            </Button>
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: COLORS.primary.white,
        borderRadius: 12,
        overflow: 'hidden',
        // height: PixelRatio(16/10),
        aspectRatio: 1.4 / 1,
        paddingHorizontal: 0
    },
    mask: {
        flex: 1,
        width: '100%',
        padding: 15,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0, 0.2)',
        alignItems: 'flex-start'
    },
    deadlineContainer: {
        backgroundColor: COLORS.primary.white,
        borderRadius: 8,
        padding: 5,
        width: 'auto',
    },
    deadline: {
        fontSize: 10,
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15
    },
    name: {
        flex: 1,
        color: COLORS.primary.white,
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        flexWrap: 'wrap'
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    }
})