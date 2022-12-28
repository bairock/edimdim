import React, { useMemo, useState } from 'react'
import {
    ScrollView,
    Dimensions,
    StyleSheet,
    View,
    LayoutAnimation
} from 'react-native'
import { useFocusEffect } from '@react-navigation/core'

import {
    Animatedscreen,
    Button,
    Icon,
    Text,
    statusBar
} from '../../components'

import { COLORS } from '../../utils/const'

const { width, height } = Dimensions.get('screen')

export const show = [
    // 'Рядом',
    'Открыто',
    // 'С высоким рейтингом'
]

export const discounts = ['С акциями']

const Filter = ({ navigation, route }) => {

    const { filter: _filter } = route.params
    const [filter, setFilter] = useState(_filter)

    const isFiltered = useMemo(() => filter.length > 0, [filter])

    useFocusEffect(() => {
        statusBar.current.setBarStyle("light-content")
        statusBar.current.setBackground(COLORS.primary.black)
    })

    const toggleFilter = (item) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        if (filter.find(f => f === item)) {
            const newFilter = filter.filter(f => f !== item)
            setFilter(newFilter)
        } else {
            setFilter([...filter, item])
        }
    }

    const submit = () => {
        navigation.navigate({
            name: "Home",
            params: { filter },
            merge: true
        })
    }

    const clearFilter = () => {
        navigation.navigate({
            name: "Home",
            params: { filter: [] },
            merge: true
        })
    }

    return (
        <Animatedscreen
            offset={15}
            closeOffset={height / 4}
            onBottomLimit={() => navigation.goBack()}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <Text style={styles.title}>Показать сначала</Text>
                {
                    show.map(item => (
                        <Button
                            key={item}
                            style={styles.item}
                            onPress={() => toggleFilter(item)}
                        >
                            <Icon name={filter.find(f => f === item) ? "circle-check" : "circle-uncheck"} size={23} color={COLORS.primary.green} />
                            <Text style={styles.itemText}>{item}</Text>
                        </Button>
                    ))
                }
                <Text style={[styles.title, { marginTop: 15 }]}>Акции</Text>
                {
                    discounts.map(item => (
                        <Button
                            key={item}
                            style={styles.item}
                            onPress={() => toggleFilter(item)}
                        >
                            <Icon name={filter.find(f => f === item) ? "circle-check" : "circle-uncheck"} size={23} color={COLORS.primary.green} />
                            <Text style={styles.itemText}>{item}</Text>
                        </Button>
                    ))
                }
                <View style={styles.row}>
                    {
                        isFiltered > 0 ? (
                            <Button
                                text="Сбросить"
                                style={[styles.clear, { width: isFiltered ? '48%' : '100%' }]}
                                textStyle={styles.clearText}
                                onPress={clearFilter}
                            />
                        ) : null
                    }
                    <Button
                        text="Применить"
                        style={{ width: isFiltered ? '48%' : '100%' }}
                        onPress={submit}
                    />
                </View>
            </ScrollView>
        </Animatedscreen>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        backgroundColor: COLORS.primary.white
    },
    contentContainer: {
        padding: 15,
        paddingTop: 0,
        alignItems: 'center',
        minHeight: height,
    },
    title: {
        fontSize: 20,
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-Bold',
        width: '100%',
        marginBottom: 24
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: COLORS.secondary.gray,
        alignItems: 'center',
        marginBottom: 15
    },
    itemText: {
        marginLeft: 15,
        fontSize: 14,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    },
    clear: {
        backgroundColor: COLORS.secondary.gray
    },
    clearText: {
        color: COLORS.primary.black
    }
})

export default Filter