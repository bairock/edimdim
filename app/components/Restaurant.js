import { DateTime } from 'luxon'
import React, { useMemo } from 'react'
import {
    StyleSheet,
    Image,
    View
} from 'react-native'
import { useQuery } from '@apollo/client'

import {
    Button,
    Icon,
    Text,
    Kitchens
} from '.'

import { FIND_MANY_REVIEW_COUNT } from '../gqls'

import { rootNavigate } from '../routes'

import { COLORS } from '../utils/const'
import { imageUrl } from '../utils/endpoints'

export const Restaurant = ({
    restaurant,
    style
}) => {

    const { data } = useQuery(FIND_MANY_REVIEW_COUNT, {
        variables: {
            where: { restaurantId: { equals: restaurant.id } }
        },
        fetchPolicy: 'network-only'
    })

    const reviewCount = useMemo(() => data && data.findManyReviewCount ? data.findManyReviewCount : 0, [data])

    if (!restaurant) {
        return null
    }

    const time = useMemo(() => {
        let text = '-'
        let color = COLORS.primary.gray
        let background = COLORS.secondary.gray
        if (restaurant.addresses.length > 0) {
            const allTimeExist = restaurant.addresses.find(address => address.allTime)
            const now = new DateTime.now()
            const duration = now.get("hour") * 60 + now.get("minute")
            let openExist = false
            let closeExist = true
            const address = restaurant.addresses[0]
            const start = new DateTime.fromISO(address.startWorkAt)
            const startDuration = start.get("hour") * 60 + start.get("minute")
            const end = new DateTime.fromISO(address.endWorkAt)
            const endDuration = end.get("hour") * 60 + end.get("minute")
            if (startDuration < endDuration) {
                if (startDuration < duration && duration < endDuration) {
                    openExist = true
                } else {
                    closeExist = false
                }
            } else {
                if (startDuration < duration || (duration < startDuration && duration < endDuration)) {
                    openExist = true
                    closeExist = false
                }
            }
            if (allTimeExist) {
                return {
                    text: 'Круглосуточно',
                    color: COLORS.primary.green,
                    background: COLORS.secondary.green
                }
            }
            if (openExist) {
                return {
                    text: `${new DateTime.fromISO(address.startWorkAt).toFormat("HH:mm")} - ${new DateTime.fromISO(address.endWorkAt).toFormat("HH:mm")}`,
                    color: COLORS.primary.green,
                    background: COLORS.secondary.green
                }
            }
            if (closeExist) {
                return {
                    text: `Закрыто до ${new DateTime.fromISO(address.startWorkAt).toFormat("HH:mm")}`,
                    color,
                    background
                }
            }
        }
        return {
            text,
            color,
            background
        }
    }, [restaurant])

    const openRestaurant = () => rootNavigate("Restaurant", { restaurant })

    return (
        <Button
            onPress={openRestaurant}
            style={[styles.container, style]}
        >
            <View style={styles.row}>
                <Image
                    source={{ uri: imageUrl + restaurant.logo }}
                    resizeMode="cover"
                    style={styles.logo}
                />
                <View style={styles.info}>
                    <View style={[styles.row, { alignItems: 'flex-start' }]}>
                        <Text style={styles.name}>{restaurant.name}</Text>
                        <View style={[styles.timeContainer, { backgroundColor: time.background }]}><Text style={[styles.time, { color: time.color }]}>{time.text}</Text></View>
                    </View>
                    <Text style={styles.rating}><Icon name="star" size={20} color={COLORS.secondary.yellow} /> {restaurant.average ? parseFloat(restaurant.average).toFixed(2) : 0} ({reviewCount})</Text>
                </View>
            </View>
            <Kitchens kitchens={restaurant.categories} style={{ marginTop: 18 }} />
        </Button>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        padding: 15,
        backgroundColor: COLORS.primary.white,
        alignItems: 'flex-start',
        overflow: 'hidden'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 12
    },
    info: {
        flex: 1,
        marginLeft: 15
    },
    name: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        marginBottom: 5,
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    time: {
        color: COLORS.primary.green,
        fontSize: 10,
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 5,
    },
    timeContainer: {
        backgroundColor: COLORS.secondary.green,
        borderRadius: 4,
        padding: 5,
        marginLeft: 5
    },
    rating: {
        color: COLORS.primary.gray,
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        textAlignVertical: 'center'
    },
    categoriesContainer: {
        width: '100%'
    },
    categoryImage: {
        width: 24,
        height: 24,
        marginRight: 10
    }
})