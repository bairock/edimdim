import React, { useMemo } from 'react'
import {
    ScrollView,
    Dimensions,
    StyleSheet,
    View,
    ImageBackground
} from 'react-native'

import { Button, Icon, Text } from '.'
import { rootNavigate } from '../routes'
import { COLORS } from '../utils/const'

const { width, height } = Dimensions.get('screen')

export const Categories = ({ filter, kitchen, city }) => {

    const sales = new Array(0).fill({ name: 'На вынос' })

    const cityName = useMemo(() => {
        if (city) {
            let cityArray = city.split(", ")
            if (cityArray.length > 1) {
                return cityArray[1]
            } else {
                return cityArray[0]
            }
        }
        return ''
    }, [city])

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            <Button
                style={[styles.category, filter.length > 0 ? { backgroundColor: COLORS.primary.green } : null]}
                onPress={() => rootNavigate("Filter", { filter, kitchen })}
            >
                <Icon name="filter" size={25} color={filter.length > 0 ? COLORS.primary.white : COLORS.primary.black} />
            </Button>
            <Button
                style={[styles.category, kitchen.length > 0 ? { backgroundColor: COLORS.primary.green } : null]}
                onPress={() => rootNavigate("Kitchen", { kitchen, filter })}
            >
                <Text
                    style={[
                        styles.categoryText,
                        {
                            marginRight: 5,
                            color: kitchen.length > 0 ? COLORS.primary.white : COLORS.primary.black
                        }
                    ]}
                >
                    Кухни
                </Text>
                <Icon name="arrow-down" size={20} color={kitchen.length > 0 ? COLORS.primary.white : COLORS.primary.black} />
            </Button>
            <Button
                style={[styles.category, city ? { backgroundColor: COLORS.primary.green } : null]}
                onPress={() => rootNavigate("City", { city })}
            >
                <Text
                    style={[
                        styles.categoryText,
                        {
                            marginRight: 5,
                            color: city ? COLORS.primary.white : COLORS.primary.black
                        }
                    ]}
                >
                    {city ? cityName : 'Город'}
                </Text>
                <Icon name="arrow-down" size={20} color={city ? COLORS.primary.white : COLORS.primary.black} />
            </Button>
            {
                sales.map((item, index) => (
                    <Button
                        key={index}
                        text={item.name}
                        style={styles.category}
                        textStyle={styles.categoryText}
                    />
                ))
            }
        </ScrollView>
    )
}

const size = 44

const styles = StyleSheet.create({
    container: {
        width,
        height: size + 30,
    },
    contentContainer: {
        paddingHorizontal: 15,
        paddingRight: 5,
        paddingVertical: 0,
        alignItems: 'center'
    },
    category: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary.white,
        width: 'auto',
        marginRight: 10
    },
    categoryText: {
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-SemiBold'
    }
})