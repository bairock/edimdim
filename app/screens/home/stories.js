import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    ScrollView,
    View,
    ImageBackground,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    SafeAreaView
} from 'react-native'
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,

} from 'react-native-reanimated'
import { useFocusEffect } from '@react-navigation/core'
import AsyncStorage from '@react-native-community/async-storage'

import {
    Text,
    Button,
    Icon,
    statusBar
} from '../../components'
import { COLORS } from '../../utils/const'
import { imageUrl } from '../../utils/endpoints'
import { DateTime } from 'luxon'

const { width, height } = Dimensions.get("window")

const Stories = ({ navigation, route }) => {

    const { restaurants, startId } = route.params
    const scrollRef = useRef()
    const [currentIndex, setCurrentIndex] = useState(0)

    const startIndex = useMemo(() => restaurants.findIndex(restaurant => restaurant.id === startId), [])

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            if (scrollRef && startIndex > 0) {
                scrollRef.current.scrollTo({ x: width * startIndex })
                setCurrentIndex(startIndex)
            }
        })
    }, [])

    const prevRestaurant = (index) => {
        if (index === 0) {
            navigation.goBack()
        } else {
            setCurrentIndex(index - 1)
            scrollRef.current.scrollTo({ x: width * (index - 1) })
        }
    }

    const nextRestaurant = (index) => {
        if (index === restaurants.length - 1) {
            navigation.goBack()
        } else {
            setCurrentIndex(index + 1)
            scrollRef.current.scrollTo({ x: width * (index + 1) })
        }
    }

    return (
        <ScrollView
            ref={scrollRef}
            style={styles.container}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={200}
            decelerationRate="fast"
            pagingEnabled
            contentOffset={{ x: startIndex * width }}
            scrollEnabled={false}
        >
            {
                restaurants.map((item, index) => (
                    <Item
                        key={item.id}
                        item={item}
                        navigation={navigation}
                        restaurantIndex={index}
                        prevRestaurant={prevRestaurant}
                        nextRestaurant={nextRestaurant}
                        currentIndex={currentIndex}
                    />
                ))
            }
        </ScrollView>
    )
}

const Item = ({ item, navigation, restaurantIndex, prevRestaurant, nextRestaurant, currentIndex }) => {

    const [currentStory, setCurrnetStory] = useState(0)
    const { stocks } = item
    const lineWidth = ((width - 30) / stocks.length) - (5 / stocks.length)
    const selectedStock = useMemo(() => stocks[currentStory], [currentStory])

    const anim = useSharedValue(0)

    useFocusEffect(() => {
        statusBar.current.setBarStyle("light-content")
        statusBar.current.setBackground(COLORS.primary.black)
        anim.value = withTiming(lineWidth, { duration: (4 - (anim.value / (lineWidth / 4))) * 1000 }, finished => {
            if (finished) {
                runOnJS(increace)()
            }
        })
    })

    useEffect(() => {
        if (currentIndex === restaurantIndex) {
            startAnim()
            setLastStories()
        } else {
            anim.value = 0
        }
    }, [restaurantIndex, currentIndex])

    const startAnim = () => {
        anim.value = 0
        anim.value = withTiming(lineWidth, { duration: 4 * 1000 }, finished => {
            if (finished) {
                runOnJS(increace)()
            }
        })
    }

    useEffect(() => {
        if (currentStory > 0) {
            setLastStories()
            startAnim()
        }
    }, [currentStory])

    const openRestaurant = () => {
        anim.value = anim.value
        navigation.navigate("Restaurant", { restaurant: item })
    }

    const setLastStories = async () => {
        const prev = await AsyncStorage.getItem(item.id)
        const last = {
            id: selectedStock.id,
            updatedAt: selectedStock.updatedAt
        }
        if (prev) {
            const { updatedAt } = JSON.parse(prev)
            if (new DateTime.fromISO(updatedAt) < new DateTime.fromISO(selectedStock.updatedAt)) {
                await AsyncStorage.setItem(item.id, JSON.stringify(last))
            }
        } else {
            await AsyncStorage.setItem(item.id, JSON.stringify(last))
        }
    }

    const animatedStyle = useAnimatedStyle(() => ({
        width: anim.value
    }))

    const reduce = () => {
        if (currentStory !== 0) {
            setCurrnetStory(currentStory - 1)
        } else {
            prevRestaurant(restaurantIndex)
        }
    }

    const increace = () => {
        if (currentStory !== stocks.length - 1) {
            setCurrnetStory(currentStory + 1)
        } else {
            nextRestaurant(restaurantIndex)
        }
    }

    const handlePress = e => {
        const { locationX } = e.nativeEvent
        if (locationX < width / 2) {
            reduce()
        } else {
            increace()
        }
    }

    return (
        <ImageBackground
            source={{ uri: imageUrl + selectedStock.image }}
            style={styles.image}
            resizeMode="cover"
        >
            <TouchableOpacity
                activeOpacity={1}
                style={styles.mask}
                onPress={handlePress}
            >
                <View style={styles.header}>
                    <View style={styles.row}>
                        {stocks.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.line,
                                    {
                                        width: lineWidth,
                                        backgroundColor: index < currentStory ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)'
                                    }
                                ]}
                            >
                                {
                                    index === currentStory ? (
                                        <Animated.View
                                            style={[
                                                styles.line,
                                                animatedStyle,
                                            ]}
                                        />
                                    ) : null
                                }
                            </View>
                        ))}
                        {/* <View style={[styles.line, { width: lineWidth }]} />
                        <View style={[styles.line, { width: lineWidth }]} /> */}
                    </View>
                    <Icon
                        name="close"
                        size={30}
                        color={COLORS.primary.white}
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.title}>
                        {selectedStock.name}
                    </Text>
                    <Text style={styles.subtitle}>
                        {selectedStock.description}
                    </Text>
                    <Button
                        text="Перейти к ресторану"
                        onPress={openRestaurant}
                    />
                </View>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
    },
    image: {
        width,
        backgroundColor: COLORS.primary.gray
    },
    mask: {
        alignContent: 'center',
        justifyContent: 'space-between',
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: '100%',
        padding: 15,
        paddingVertical: 30
    },
    header: {
        width: '100%',
        alignItems: 'flex-end'
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 15,
        justifyContent: 'space-between'
    },
    line: {
        height: 4,
        backgroundColor: COLORS.secondary.white,
        borderRadius: 2
    },
    bottom: {
        width: '100%'
    },
    title: {
        color: COLORS.primary.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: 28,
        marginBottom: 15,
        width: '100%'
    },
    subtitle: {
        color: COLORS.primary.white,
        marginBottom: 15,
        width: '100%'
    }
})

export default Stories