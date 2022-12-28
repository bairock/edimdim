import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    View
} from 'react-native'
import { useQuery } from '@apollo/client'
import { useFocusEffect } from '@react-navigation/core'
import { DateTime } from 'luxon'
import AsyncStorage from '@react-native-community/async-storage'

import { FIND_MANY_STOCK } from '../../gqls'
import { Empty, Promotions, FlatList, statusBar } from '../../components'
import { COLORS } from '../../utils/const'

const { width, height } = Dimensions.get('screen')

const Index = ({ route, navigation }) => {
    const { city } = route.params

    const variables = useMemo(() => ({
        where: {
            delete: { equals: false },
            endAt: { gt: new DateTime.local() },
            publish: { equals: true },
            restaurant: {
                publish: { equals: true },
                city: { equals: city }
            }
        },
        take: 10,
        skip: 0
    }), [city])

    const { data, loading, error, refetch, fetchMore } = useQuery(FIND_MANY_STOCK, {
        variables
    })

    useFocusEffect(() => {
        statusBar.current.setBarStyle("dark-content")
        statusBar.current.setBackground(COLORS.secondary.white)
        getCity()
    })

    const getCity = async () => {
        let data = await AsyncStorage.getItem('city')
        if (!data) {
            data = 'Якутск'
        }
        navigation.setParams({ ...route.params, city: data })
    }

    const keyExtractor = useCallback((_, index) => index, [])

    const renderItem = useCallback(({ item }) => (
        <View style={styles.item}>
            <Promotions promotion={item} />
        </View>
    ), [])

    const stocks = data && data.findManyStock ? data.findManyStock : []

    return (
        <FlatList
            data={stocks}
            keyExtractor={keyExtractor}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            renderItem={renderItem}
            loading={loading}
            onRefresh={refetch}
            ListEmptyComponent={
                <Empty
                    text={error ? "Произошла ошибка. Повторите попытку" : "Нет доступных акций"}
                    buttonText={error ? "Повторить" : ""}
                    onButtonPress={error ? refetch : undefined}
                />
            }
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
    },
    contentContainer: {
        alignItems: 'center',
        padding: 15
    },
    item: {
        marginBottom: 15,
        width: width - 30
    }
})

export default Index