import { useQuery } from '@apollo/client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
    View,
    Dimensions,
    StyleSheet,
    StatusBar,
    InteractionManager
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { useFocusEffect } from '@react-navigation/core'
import Geolocation from '@react-native-community/geolocation'
import AsyncStorage from '@react-native-community/async-storage'
import { DateTime } from 'luxon'

import {
    Icon,
    Stories,
    Categories,
    Text,
    Restaurant,
    Button,
    Empty,
    FlatList,
    statusBar
} from '../../components'
import { FIND_MANY_RESTAURANT } from '../../gqls'

import { COLORS } from '../../utils/const'
import { useUser } from '../../utils/hooks'
import { useStateValue } from '../../store'

const { width } = Dimensions.get('screen')

let geolocation

const Home = ({ navigation, route }) => {

    const { filter, kitchen, city } = route.params
    const { reducer } = useStateValue()
    const refs = useRef(new Map()).current
    const [ready, setReady] = useState(false)

    const [_, dispatch] = reducer

    const variables = useMemo(() => {
        let variables = {
            where: {
                delete: { equals: false },
                publish: { equals: true },
                city: { equals: city }
            },
            take: 10,
            skip: 0,
            stocksWhere: {
                delete: { equals: false },
                publish: { equals: true }
            },
            orderBy: [
                {
                    moderator: {
                        weight: 'desc'
                    }
                },
                {
                    average: 'desc'
                }
            ]
        }

        if (kitchen.length > 0) {
            variables.where['categories'] = { hasSome: kitchen }
        }

        if (filter.length > 0) {
            if (filter.indexOf("Открыто") != -1) {
                const nowTime = new DateTime.now().set({ day: 1, month: 1, year: 1970 })
                variables.where['addresses'] = {
                    some: {
                        OR: [
                            { allTime: { equals: true } },
                            {
                                endWorkAt: { gt: nowTime },
                                startWorkAt: { lt: nowTime }
                            }
                        ]
                    }
                }
            }
            if (filter.indexOf("С акциями") != -1) {
                variables.where['stocks'] = {
                    some: {
                        endAt: { gt: new DateTime.local() },
                        delete: { equals: false },
                    }
                }
            }
        }

        return variables
    }, [filter, kitchen, city])

    const { data, loading, error, refetch } = useQuery(FIND_MANY_RESTAURANT, {
        variables
    })

    useFocusEffect(() => {
        statusBar.current.setBarStyle("light-content")
        statusBar.current.setBackground(COLORS.primary.green)
        const storiesRef = refs.get("stories")
        if (storiesRef) {
            refs.get("stories").refetch()
        }
    })

    useUser({
        onCompleted: ({ findMeUser }) => {
            if (findMeUser && !findMeUser.name) {
                navigation.navigate("Registration")
            }
        },
        onError: (e) => {
            navigation.navigate("Login")
        }
    })

    const getUserCity = async () => {
        let data = await AsyncStorage.getItem('city')
        if (!data) {
            data = 'Якутск'
        }
        navigation.setParams({ ...route.params, city: data })
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            SplashScreen.hide()
            getUserCity()
            Geolocation.getCurrentPosition(
                ({ coords: { longitude, latitude } }) => {
                    dispatch({
                        type: 'setPosition',
                        data: { longitude, latitude }
                    })
                },
                ({ message }) => {
                    console.error(message)
                },
                {
                    enableHighAccuracy: true,
                }
            )
            geolocation = Geolocation.watchPosition(
                ({ coords: { longitude, latitude } }) => {
                    dispatch({
                        type: 'setPosition',
                        data: { longitude, latitude }
                    })
                },
                ({ message }) => {
                    console.error(message)
                },
                {
                    enableHighAccuracy: true,
                }
            )
            setReady(true)
        })
        return () => {
            if (geolocation) {
                Geolocation.clearWatch(geolocation)
            }
        }
    }, [])

    const renderItem = useCallback(({ item, index }) => (
        <View style={styles.item}>
            <Restaurant
                restaurant={item}
                style={styles.restaurant}
            />
        </View>
    ), [])

    const keyExtractor = useCallback((_, index) => index, [])

    const restaurants = useMemo(() => data && data.findManyRestaurant ? data.findManyRestaurant : [], [data])

    footer = () => {
        return (
            <Button
                text='Добавить магазин'
                style={{ width: '100%' }}
                onPress={() => navigation.navigate('Request')}
            />
        )
    }

    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor={COLORS.primary.green}
            />
            <FlatList
                data={restaurants}
                keyExtractor={keyExtractor}
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                loading={loading || !ready}
                onRefresh={() => {
                    refetch()
                    refs.get("stories").refetch()
                }}
                ListHeaderComponent={
                    !error ? (
                        <>
                            <Button
                                activeOpacity={1}
                                style={styles.inputContainer}
                                onPress={() => navigation.navigate("Search")}
                            >
                                <Icon name="search" size={20} color={COLORS.primary.gray} />
                                <Text style={styles.placeholder}>Найти ресторан или блюдо</Text>
                            </Button>
                            <Stories
                                ref={ref => refs.set("stories", ref)}
                                city={city}
                            />
                            <Text style={styles.title}>Рестораны</Text>
                            <Categories filter={filter} kitchen={kitchen} city={city} />
                        </>
                    ) : null
                }
                ListHeaderComponentStyle={styles.header}
                ListEmptyComponent={
                    <Empty
                        text={error ? "Произошла ошибка, повторите попытку" : "Нет доступных рестаранов"}
                        buttonText={error ? "Повторить" : null}
                        onButtonPress={refetch}
                        style={{ padding: 15 }}
                    />
                }
                renderItem={renderItem}
                ListFooterComponentStyle={styles.footer}
                ListFooterComponent={footer}
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
        width,
        alignItems: 'center'
    },
    inputContainer: {
        borderWidth: 0,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primary.white,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 20,
        color: COLORS.primary.black,
        width: '100%',
        fontFamily: "Montserrat-Bold"
    },
    restaurant: {
        marginBottom: 15
    },
    placeholder: {
        color: COLORS.primary.gray,
        fontSize: 14,
        marginLeft: 15
    },
    header: {
        width: '100%',
        padding: 15,
        paddingBottom: 0,
        alignItems: 'center'
    },
    footer: {
        width: '100%',
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    item: {
        width,
        paddingHorizontal: 15
    }
})

export default Home