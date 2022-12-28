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
    Restaurant,
    Empty
} from '../../components'

import { COLORS } from "../../utils/const"

import { FIND_MANY_RESTAURANT } from "../../gqls"

const { width, height } = Dimensions.get("window")

const Search = () => {
    const [search, setSearch] = useState('')
    const [searchString, setSearchString] = useState('')
    const [history, setHistory] = useState([])
    const [city, setCity] = useState('Якутск')

    const { data, loading, refetch } = useQuery(FIND_MANY_RESTAURANT, {
        variables: {
            where: {
                delete: { equals: false },
                publish: { equals: true },
                OR: [
                    { name: { contains: searchString, mode: 'insensitive' } },
                    { description: { contains: searchString, mode: 'insensitive' } },
                    { deliveryCondition: { contains: searchString, mode: 'insensitive' } },
                    {
                        products: {
                            some: {
                                OR: [
                                    { name: { contains: searchString, mode: 'insensitive' } },
                                    { categories: { has: searchString } }
                                ]
                            }
                        }
                    },
                    { categories: { has: searchString } }
                ],
                city: { equals: city }
            },
            take: 10,
            skip: 0,
        }
    })

    useEffect(() => {
        getHistory()
    }, [])

    const getCity = async () => {
        let data = await AsyncStorage.getItem('city')
        if (!data) {
            data = 'Якутск'
        }
        setCity(data)
    }

    useFocusEffect(() => {
        statusBar.current.setBarStyle("dark-content")
        statusBar.current.setBackground(COLORS.secondary.white)
        getCity()
    })

    const getHistory = async () => {
        const data = await AsyncStorage.getItem("history")
        if (data) {
            setHistory(JSON.parse(data))
        }
    }

    const submit = async () => {
        const exist = history.findIndex(item => item === search)
        if (exist == -1) {
            const newHistory = [search, ...history]
            setHistory(newHistory)
            setSearchString(search)
            await AsyncStorage.setItem("history", JSON.stringify(newHistory))
        }
    }

    const clear = async () => {
        await AsyncStorage.removeItem("history")
        setHistory([])
    }

    const renderHistory = useCallback(({ item, index }) => (
        <Button
            onPress={() => {
                setSearch(item)
                setSearchString(item)
            }}
            style={[styles.row, styles.item]}
        >
            <Text style={styles.itemText}>{item}</Text>
            <Icon name="link-arrow" size={20} color={COLORS.primary.black} />
        </Button>
    ), [])

    const renderRestaurant = useCallback(({ item, index }) => (
        <Restaurant
            restaurant={item}
            style={styles.restaurant}
        />
    ), [])

    const keyExtractor = useCallback((_, index) => index, [])

    const restaurants = useMemo(() => data && data.findManyRestaurant ? data.findManyRestaurant : [], [data])

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
                data={searchString ? restaurants : history}
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                loading={loading}
                onRefresh={refetch}
                ListHeaderComponent={
                    <View style={styles.row}>
                        <Text style={styles.label}>Ранее вы искали</Text>
                        <Button
                            style={styles.button}
                            onPress={clear}
                        >
                            <Text style={styles.value}>Очистить</Text>
                            <Icon name="close" size={20} color={COLORS.primary.green} />
                        </Button>
                    </View>
                }
                ListHeaderComponentStyle={{ width: '100%' }}
                keyExtractor={keyExtractor}
                renderItem={searchString ? renderRestaurant : renderHistory}
                ListEmptyComponent={
                    <Empty
                        text="Ничего не найдено"
                    />
                }
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
        alignItems: 'center',
        padding: 15
    },
    inputContainer: {
        borderWidth: 0,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primary.white,
        width: width - 30,
        alignSelf: 'center'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    label: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: COLORS.primary.black
    },
    value: {
        fontSize: 16,
        color: COLORS.primary.green,
        marginRight: 5
    },
    button: {
        width: 'auto',
        height: 'auto',
        paddingHorizontal: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
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
    restaurant: {
        marginTop: 15
    }
})

export default Search