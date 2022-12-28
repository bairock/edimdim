import React, { useCallback, useMemo } from 'react'
import {
    View,
    Dimensions,
    StyleSheet
} from 'react-native'
import { useApolloClient, useQuery } from '@apollo/client'
import { useFocusEffect } from '@react-navigation/core'

import { Empty, Order, FlatList, statusBar } from '../../components'
import { FIND_MANY_ORDER } from '../../gqls'
import { useUser } from '../../utils/hooks'
import { COLORS } from '../../utils/const'

const { width } = Dimensions.get('screen')

export let variables

const Orders = (props) => {

    const { user } = useUser()
    const client = useApolloClient()

    variables = useMemo(() => ({
        where: {
            userId: { equals: user ? user.id : "" }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 10,
        skip: 0
    }), [user])

    useFocusEffect(() => {
        statusBar.current.setBarStyle("dark-content")
        statusBar.current.setBackground(COLORS.secondary.white)
    })

    const { data, loading, error, refetch, fetchMore } = useQuery(FIND_MANY_ORDER, {
        variables,
        pollInterval: 1000 * 15
    })

    const orders = data && data.findManyOrder ? data.findManyOrder : []

    const keyExtractor = useCallback((item, index) => index, [])

    const renderItem = useCallback(({ item, index }) => (
        <View style={styles.item}>
            <Order order={item} />
        </View>
    ), [])

    const onEndReached = useCallback(async () => {
        const { data } = await fetchMore({
            variables: {
                take: orders.length + 10
            }
        })
        if (data) {
            await client.writeQuery({
                query: FIND_MANY_ORDER,
                data
            })
        }
    }, [orders.length])

    return (
        <FlatList
            data={orders}
            keyExtractor={keyExtractor}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            renderItem={renderItem}
            loading={loading}
            onRefresh={refetch}
            ListEmptyComponent={
                <Empty
                    text={error ? "Произошла ошибка, повторите попытку" : "Вы пока еще ничего не заказывали"}
                    onButtonPress={error ? refetch : undefined}
                    buttonText={error ? "Повторить" : undefined}
                />
            }
            onEndReachedThreshold={0}
            onEndReached={onEndReached}
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
        width: width - 30,
        marginBottom: 15
    }
})

export default Orders