import React, { useEffect, useState, useCallback, useMemo } from "react"
import {
    View,
    ScrollView,
    Dimensions,
    StyleSheet,
    RefreshControl
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from "@react-navigation/core"
import { useQuery } from "@apollo/client"

import {
    Button,
    Text,
    Input,
    Icon,
    statusBar,
    FlatList,
    Product,
    Empty
} from '../../../components'

import { COLORS } from "../../../utils/const"

import { FIND_MANY_PRODUCT } from "../../../gqls"

const { width, height } = Dimensions.get("window")

const size = (width - 45) / 2

const ProductSearch = ({ route }) => {
    const { restaurant } = route.params
    const [search, setSearch] = useState('')
    const [searchString, setSearchString] = useState('')

    const { data, loading, refetch } = useQuery(FIND_MANY_PRODUCT, {
        variables: {
            where: {
                delete: { equals: false },
                restaurant: {
                    id: { equals: restaurant.id },
                    publish: { equals: true },
                },
                OR: [
                    { name: { contains: searchString, mode: 'insensitive' } },
                    { categories: { has: searchString } }
                ]
            }
        }
    })

    useFocusEffect(() => {
        statusBar.current.setBarStyle("dark-content")
        statusBar.current.setBackground(COLORS.secondary.white)
    })

    const submit = () => {
        setSearchString(search)
    }

    const renderItem = useCallback(({ item, index }) => (
        <Product
            product={item}
            size={size}
            style={styles.product}
            restaurant={restaurant}
        />
    ), [])

    const keyExtractor = useCallback((_, index) => index, [])

    const products = useMemo(() => searchString && data && data.findManyProduct ? data.findManyProduct : [], [data, searchString])

    return (
        <>
            <Input
                value={search}
                onChangeText={text => {
                    if (!text) {
                        setSearchString("")
                    }
                    setSearch(text)
                }}
                placeholder="Найти ресторан или блюдо"
                containerStyle={styles.inputContainer}
                left={
                    <Icon name="search" size={20} color={COLORS.primary.gray} />
                }
                returnKeyType="search"
                onSubmitEditing={submit}
            />
            <FlatList
                data={products}
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                loading={loading}
                ListHeaderComponentStyle={{ width: '100%' }}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                onRefresh={refetch}
                ListEmptyComponent={
                    searchString ?
                        <Empty
                            text="Ничего не найдено"
                        />
                        : null
                }
                numColumns={2}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
    },
    contentContainer: {
        alignItems: 'flex-start',
        padding: 15
    },
    inputContainer: {
        borderWidth: 0,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primary.white,
        width: width - 30,
        alignSelf: 'center'
    },
    item: {
        paddingVertical: 15,
        borderBottomColor: COLORS.secondary.gray,
        borderBottomWidth: 1,
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
        height: 'auto',
        borderRadius: 0
    },
    itemText: {
        color: COLORS.primary.black,
        width: 'auto',
        flex: 1,
        marginRight: 5
    },
    product: {
        width: size,
        marginBottom: 15,
        marginRight: 15
    }
})

export default ProductSearch