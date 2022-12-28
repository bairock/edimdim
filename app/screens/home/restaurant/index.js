import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    RefreshControl,
    SectionList,
    View,
    Platform,
    UIManager,
    InteractionManager
} from 'react-native'
import { useFocusEffect } from '@react-navigation/core'
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { useQuery } from '@apollo/client'

import {
    Product,
    statusBar,
    Text,
    Icon,
    Button
} from '../../../components'

import { CATEGORIES, PRODUCT_BY_CATEGORIES } from '../../../gqls'

import Info from './info'
import Promotions from './promotions'
import Categories from './categories'
import { COLORS } from '../../../utils/const'
import { useStateValue } from '../../../store'

const { width } = Dimensions.get('screen')

const size = (width - 45) / 2

const Restaurant = ({ navigation, route }) => {

    const { restaurant } = route.params
    const [selectedCategory, setSelectedCategory] = useState('')
    const [headerHeight, setHeaderHeight] = useState(0)
    const [ready, setReady] = useState(false)
    const refs = useRef(new Map()).current

    const { reducer } = useStateValue()
    const [state, _] = reducer
    const { products: carts } = state

    const anim = useSharedValue(0)

    const keyExtractor = useCallback((_, index) => index, [])

    useFocusEffect(() => {
        statusBar.current.setBarStyle("light-content")
        statusBar.current.setBackground(COLORS.primary.black)
    })

    useEffect(() => {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
        if (restaurant && restaurant.productsCategoriers.length > 0) {
            setSelectedCategory(restaurant.productsCategoriers[0])
        }
        InteractionManager.runAfterInteractions(() => {
            setReady(true)
        })

    }, [])

    const variables = useMemo(() => ({
        where: {
            restaurantId: {
                equals: restaurant.id
            },
            delete: { equals: false },
            publish: { equals: true },
            restaurant: {
                publish: { equals: true }
            }
        }
    }), [])

    // const { data, loading, refetch } = useQuery(CATEGORIES, {
    //     variables,
    //     onCompleted: ({ findManyCategoryByProduct }) => {
    //         if (findManyCategoryByProduct.length > 0) {
    //             setSelectedCategory(findManyCategoryByProduct[0])
    //         }
    //     },
    //     fetchPolicy: "network-only"
    // })

    const { data: productData, loading: productLoading, refetch: productRefetch } = useQuery(PRODUCT_BY_CATEGORIES, {
        variables
    })

    const handleScroll = useCallback(e => {
        const offset = e.nativeEvent.contentOffset.y
        anim.value = offset
    }, [])

    const animatedStyle = useAnimatedStyle(() => ({
        display: anim.value > headerHeight ? "flex" : 'none'
    }))

    const onHeaderLayout = useCallback((e) => {
        const { height } = e.nativeEvent.layout
        setHeaderHeight(height)
    }, [])

    const renderItem = useCallback(({ section, index }) => {
        if (index !== 0 || section.data.length === 0) return null

        return (
            <View style={styles.row}>
                {
                    section.data.map(item => (
                        <View key={item.id} style={styles.item}>
                            <Product
                                product={item}
                                size={size}
                                restaurant={restaurant}
                            />
                        </View>
                    ))
                }
            </View>
        )
    }, [])

    const renderSectionHeader = useCallback(({ section: { title } }) => (
        <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    ), [])

    const categories = useMemo(() => restaurant && restaurant.productsCategoriers ? restaurant.productsCategoriers : [], [restaurant])
    const products = useMemo(() => productData && productData.findManyProductGroupByCategory ? productData.findManyProductGroupByCategory : [], [productData])

    const exist = useMemo(() => carts.find(cart => cart.restaurant === restaurant.id), [carts])

    const totalPrice = useMemo(() => {
        if (products.length === 0 || carts.length === 0 || !exist) {
            return 0
        }
        return carts.reduce((acc, cart) => {
            const arr = products.reduce((dataAcc, dataItem) => {
                dataAcc = [...dataItem.data, ...dataAcc]
                return dataAcc
            }, [])
            const product = arr.find(item => item.id === cart.product)
            if (product) {
                acc = acc + (product.price * cart.count)
            }
            return acc
        }, 0)
    }, [products, carts, exist])

    const onSelectCategory = useCallback((category) => {
        setTimeout(() => {
            setSelectedCategory(category)
        }, 0)
        const index = products.findIndex(item => item.title === category)
        const list = refs.get("list")
        if (index != -1) {
            list.scrollToLocation({
                sectionIndex: index,
                animated: true,
                itemIndex: 0,
                viewOffset: 74
            })
        }
    }, [refs, products, setSelectedCategory])

    const renderHader = useCallback(() => (
        <View style={styles.header}>
            <View onLayout={onHeaderLayout}>
                <Info
                    navigation={navigation}
                    restaurant={restaurant}
                />
                <Promotions
                    restaurant={restaurant}
                />
            </View>
            <View ref={ref => refs.set("cat", ref)}>
                <Categories
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelect={onSelectCategory}
                />
            </View>
        </View>
    ), [onSelectCategory, selectedCategory, refs, onHeaderLayout])

    const isEnaugt = useMemo(() => restaurant.minimumOrderAmount - totalPrice, [totalPrice])

    return (
        <>
            <Animated.View
                style={[
                    styles.hiddenCategories,
                    animatedStyle
                ]}
            >
                <Categories
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelect={onSelectCategory}
                />
            </Animated.View>
            <SectionList
                ref={ref => refs.set("list", ref)}
                sections={ready ? products : []}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                ListHeaderComponent={renderHader}
                onScrollToIndexFailed={() => { }}
                refreshControl={
                    <RefreshControl
                        refreshing={!ready || productLoading}
                        onRefresh={() => {
                            productRefetch()
                        }}
                        style={{ backgroundColor: COLORS.primary.black }}
                        tintColor={COLORS.primary.white}
                    />
                }
                onScroll={handleScroll}
                scrollEventThrottle={1}
                initialNumToRender={1}
            />
            {
                exist ? (
                    <View style={styles.footer}>
                        {
                            isEnaugt > 0 ? (
                                <Text style={styles.enaught}>Добавьте еще на {isEnaugt} ₽</Text>
                            ) : null
                        }
                        <Button
                            style={styles.addButton}
                            onPress={() => navigation.replace("Cart")}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon
                                    name="cart"
                                    color={COLORS.primary.white}
                                    size={25}
                                    style={{ marginRight: 5 }}
                                />
                                <Text style={styles.addButtonText}>{"В корзину"}</Text>
                            </View>
                            <Text style={styles.price}>{totalPrice} ₽</Text>
                        </Button>
                    </View>
                ) : null
            }
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
        paddingBottom: 100
    },
    header: {
        width
    },
    footer: {
        width,
        position: 'absolute',
        padding: 15,
        bottom: 0,
        backgroundColor: COLORS.primary.white,
        elevation: 5
    },
    item: {
        width: size,
        marginBottom: 15
    },
    sectionHeaderContainer: {
        width,
        marginBottom: 15,
        paddingHorizontal: 15
    },
    sectionTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20
    },
    hiddenCategories: {
        position: 'absolute',
        zIndex: 1,
        width
    },
    row: {
        width: width - 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    addButton: {
        flex: 1,
        width: 'auto',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    addButtonText: {
        fontSize: 14,
        color: COLORS.primary.white,
        fontFamily: 'Montserrat-SemiBold'
    },
    price: {
        fontSize: 14,
        color: COLORS.primary.white,
        fontFamily: 'Montserrat-SemiBold'
    },
    enaught: {
        marginBottom: 15,
        textAlign: 'center'
    }
})

export default Restaurant