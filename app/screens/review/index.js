import React, { useCallback } from 'react'
import {
    Dimensions,
    View,
    StyleSheet
} from 'react-native'
import { useQuery } from '@apollo/client'
import { DateTime } from 'luxon'
import { useFocusEffect } from '@react-navigation/native'

import {
    Icon,
    Text,
    FlatList,
    Empty,
    statusBar
} from '../../components'

import { FIND_MANY_REVIEW } from '../../gqls'
import { COLORS } from '../../utils/const'

const { width } = Dimensions.get("window")

const Review = ({ route, navigatation }) => {
    const { restaurantId } = route.params
    const stars = new Array(5).fill(false)

    const { data, loading, error, refetch } = useQuery(FIND_MANY_REVIEW, {
        variables: {
            where: { restaurantId: { equals: restaurantId } },
            orderBy: {
                createdAt: 'desc'
            }
        },
        fetchPolicy: 'network-only'
    })

    useFocusEffect(() => {
        statusBar.current.setBarStyle("dark-content")
        statusBar.current.setBackground(COLORS.secondary.gray)
    })

    const keyExtractor = useCallback((_, index) => index, [])

    const renderItem = useCallback(({ item }) => (
        <View style={styles.wrapper}>
            <View style={styles.item}>
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                    <View>
                        <Text>{item.user.name}</Text>
                        <View style={styles.row}>
                            {
                                stars.map((_, index) => (
                                    <Icon
                                        key={index}
                                        name="star"
                                        size={20}
                                        color={(index + 1) <= item.value ? COLORS.secondary.yellow : COLORS.primary.black}
                                        // onPress={() => setRating(index + 1)}
                                    />
                                ))
                            }
                        </View>
                    </View>
                    <Text>{new DateTime.fromISO(item.createdAt).toFormat("dd:MM:yyyy")}</Text>
                </View>
                {
                    item.order && item.order.shipments ? (
                        <Text style={styles.shipments}>{item.order.shipments.map(shipment => shipment.product.name).join(", ")}</Text>
                    ) : null
                }
                <Text style={styles.title}>Комментарий</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    ), [])

    const reviews = data && data.findManyReview ? data.findManyReview : []

    return (
        <FlatList
            data={reviews}
            styles={styles.container}
            contentContainerStyle={styles.contentContainer}
            ListEmptyComponent={
                <Empty
                    text={error ? "Произошла ошибка повторите попытку позже" : "У данного ресторана еще нет отзывов"}
                    buttonText={error ? "Повторить" : ''}
                    onButtonPress={error ? refetch : null}
                    style={{ padding: 15 }}
                />
            }
            loading={loading}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onRefresh={refetch}
        />
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width,
        alignItems: 'center',
        paddingHorizontal: 15
    },
    container: {
        flex: 1,
        width,
    },
    contentContainer: {
        alignItems: 'center'
    },
    item: {
        borderRadius: 12,
        backgroundColor: COLORS.primary.white,
        width: '100%',
        padding: 15,
        marginBottom: 15,
        elevation: 4
    },
    row: {
        marginTop: 10,
        flexDirection: 'row',
    },
    description: {
        marginTop: 5,
        fontFamily: 'Montserrat-SemiBold'
    },
    shipments: {
        marginTop: 5,
        color: COLORS.primary.gray,
        fontSize: 12
    },
    title: {
        color: COLORS.primary.gray,
        marginTop: 15
    }
})

export default Review