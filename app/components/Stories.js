import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import {
    ScrollView,
    Dimensions,
    StyleSheet,
    View,
    ImageBackground
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useApolloClient, useLazyQuery, useQuery } from '@apollo/client'
import { DateTime } from 'luxon'

import { Button, Text } from '.'
import {
    FIND_MANY_RESTAURANT,
    FIND_MANY_STOCK_COUNT
} from '../gqls'
import { rootNavigate } from '../routes'
import { COLORS } from '../utils/const'
import { imageUrl } from '../utils/endpoints'

const { width, height } = Dimensions.get('screen')

export const Stories = forwardRef(({ city = 'Якутск' }, ref) => {

    const variables = useMemo(() => ({
        where: {
            stocks: {
                some: {
                    endAt: { gt: new DateTime.local() },
                    delete: { equals: false },
                }
            },
            delete: { equals: false },
            publish: { equals: true },
            city: city ? { equals: city } : undefined
        },
        stocksWhere: {
            endAt: { gt: new DateTime.local() },
            delete: { equals: false },
        },
        stocksOrderBy: {
            updatedAt: 'asc'
        }
    }), [city])

    const { data, refetch } = useQuery(FIND_MANY_RESTAURANT, {
        variables,
        nextFetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true
    })

    useImperativeHandle(ref, () => ({
        refetch: () => {
            if (refetch) {
                refetch()
            }
        }
    }))

    const restaurants = useMemo(() => data && data.findManyRestaurant ? data.findManyRestaurant : [], [data])

    if (restaurants.length === 0) {
        return <View style={styles.separate} />
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {
                restaurants.map((item) => (
                    <Story
                        key={item.id}
                        item={item}
                        restaurants={restaurants}
                    />
                ))
            }
        </ScrollView>
    )
})

const Story = ({ item, restaurants }) => {

    const [hasNew, setHasNew] = useState(false)
    const client = useApolloClient()
    useEffect(() => {
        getLastStock()
    }, [item])

    const getLastStock = async () => {
        const lastStock = await AsyncStorage.getItem(item.id)
        if (lastStock) {
            const { updatedAt } = JSON.parse(lastStock)
            const { data: { findManyStockCount } } = await client.query({
                query: FIND_MANY_STOCK_COUNT,
                variables: {
                    where: {
                        restaurantId: { equals: item.id },
                        delete: { equals: false },
                        updatedAt: { gt: updatedAt }
                    }
                },
                fetchPolicy: "network-only"
            })
            if (findManyStockCount) {
                setHasNew(true)
            } else {
                setHasNew(false)
            }
        } else {
            setHasNew(true)
        }
    }

    return (
        <Button
            style={[
                styles.story,
                hasNew ? {
                    borderWidth: 2
                } : null
            ]}
            onPress={() => rootNavigate("Stories", { restaurants, startId: item.id })}
        >
            <ImageBackground
                source={{ uri: imageUrl + item.logo }}
                style={styles.image}
                resizeMode="cover"
            >
                <View style={styles.mask}>
                    <Text style={styles.title}>{item.stocks[0].name}</Text>
                </View>
            </ImageBackground>
        </Button>
    )
}

const size = width * 0.28

const styles = StyleSheet.create({
    separate: {
        paddingTop: 15
    },
    container: {
        width,
        maxHeight: size + 30,
    },
    contentContainer: {
        padding: 15,
        paddingRight: 5
    },
    story: {
        backgroundColor: COLORS.primary.white,
        width: size,
        height: size,
        borderRadius: 12,
        borderWidth: 0,
        borderColor: COLORS.primary.green,
        paddingHorizontal: 3,
        padding: 3,
        marginRight: 10
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        overflow: 'hidden'
    },
    mask: {
        justifyContent: 'flex-end',
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    title: {
        fontSize: 11,
        color: COLORS.primary.white,
        fontFamily: 'Montserrat-Bold',
        padding: 5
    }
})