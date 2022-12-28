import React, { useMemo, useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    ImageBackground,
    Alert,
    Platform,
    Image
} from 'react-native'
import { useFocusEffect } from '@react-navigation/core'
import { useMutation } from '@apollo/client'
import { ScrollView } from 'react-native-gesture-handler'

import {
    Animatedscreen,
    Button,
    Icon,
    Text,
    statusBar,
    toast,
    Cuonter
} from '../../components'

import {
    CREATE_ONE_SHIPMENT,
    UPDATE_ONE_SHIPMENT,
    DELETE_MANY_SHIPMENT
} from '../../gqls'

import { COLORS } from '../../utils/const'
import { imageUrl } from '../../utils/endpoints'
import { useStateValue } from '../../store'
import { useUser } from '../../utils/hooks'

const { width, height } = Dimensions.get('screen')

const Index = ({ route, navigation }) => {
    const { product, restaurant } = route.params
    const [count, setCount] = useState(1)

    const { user } = useUser()
    const { reducer } = useStateValue()
    const [state, dispatch] = reducer

    const inCart = useMemo(() => state.products.find(item => item.product === product.id), [state.products])

    const [create] = useMutation(CREATE_ONE_SHIPMENT, {
        onCompleted: ({ createOneShipment }) => {
            dispatch({
                type: "updateData",
                data: {
                    id: createOneShipment.id,
                    count: createOneShipment.count,
                    product: product.id,
                    restaurant: restaurant.id
                }
            })
        }
    })

    const [update] = useMutation(UPDATE_ONE_SHIPMENT)

    useFocusEffect(() => {
        statusBar.current.setBarStyle("light-content")
        statusBar.current.setBackground(COLORS.primary.black)
    })

    const totalPrice = useMemo(() => parseInt(product.price) * parseInt(count), [count])

    const [claearShipments, { loading: deleteLoading }] = useMutation(DELETE_MANY_SHIPMENT, {
        variables: {
            where: { id: { in: state.products.map(item => item.id) } }
        },
        onCompleted: () => {
            dispatch({
                type: "setCart",
                data: []
            })
            create({
                variables: {
                    data: {
                        count: 1,
                        product: {
                            connect: { id: product.id }
                        },
                        user: user ? { connect: { id: user.id } } : undefined
                    }
                }
            })
            dispatch({
                type: "addToCart",
                data: {
                    id: new Date().getTime().toString(),
                    count: 1,
                    product: product.id,
                    restaurant: restaurant.id
                }
            })
            toast.current.success("Товар добавлен")
        },
        onError: e => {
            toast.current.error("Не удалось очистить корзину")
        }
    })

    const tuggleCard = async () => {
        if (!inCart) {
            if (state.products.length > 0) {
                const product = state.products[0]
                if (product.restaurant !== restaurant.id) {
                    Alert.alert(
                        'Предупреждение',
                        "Вы пытаетесь добавить в корзину товар из другого ресторана, если вы его добавите то другие товары из корзины будут удалены. Очистить корзину?",
                        [
                            { text: 'Отмена', onPress: () => null },
                            {
                                text: 'Да',
                                onPress: claearShipments
                            },
                        ],
                        { cancelable: true },
                    )
                    return
                }
            }
            dispatch({
                type: "addToCart",
                data: {
                    id: new Date().getTime().toString(),
                    count,
                    product: product.id,
                    restaurant: restaurant.id
                }
            })
            create({
                variables: {
                    data: {
                        count,
                        product: {
                            connect: { id: product.id }
                        },
                        user: user ? { connect: { id: user.id } } : undefined
                    }
                }
            })
            toast.current.success("Товар добавлен")
        } else {
            navigation.navigate("Cart")
            // try {
            //     update({
            //         variables: {
            //             where: { id: inCart.id },
            //             data: { delete: { set: true } }
            //         }
            //     })
            //     dispatch({
            //         type: "removeFromCart",
            //         data: inCart.id
            //     })
            //     toast.current.success("Товар удалён из корзины")
            // } catch (e) {
            //     console.error(e)
            // }
        }
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
                {/* <ImageBackground
                    source={{ uri: imageUrl + product.image }}
                    style={styles.image}
                    resizeMode='contain'
                >
                    <View style={styles.mask}>

                    </View>
                </ImageBackground> */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: imageUrl + product.image }}
                        style={styles.image}
                        resizeMode='contain'
                    />
                </View>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.text}>{product.description}</Text>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <Cuonter
                    value={count}
                    cart={inCart}
                    onPlus={() => setCount(count + 1)}
                    onMinus={() => setCount(count - 1)}
                />
                <Button
                    style={[
                        styles.addButton,
                        {
                            justifyContent: deleteLoading ? 'center' : 'space-between'
                        }
                    ]}
                    onPress={tuggleCard}
                    loading={deleteLoading}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Icon
                            name="cart"
                            color={COLORS.primary.white}
                            size={25}
                            style={{ marginRight: 5 }}
                        />
                        <Text style={styles.addButtonText}>{!inCart ? "Добавить" : "Перейти в корзину"}</Text>
                    </View>
                    {
                        !inCart && (
                            <Text style={styles.price}>{totalPrice} ₽</Text>
                        )
                    }
                </Button>
            </View>
        </Animatedscreen>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width,
        backgroundColor: COLORS.primary.white
    },
    contentContainer: {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBottom: 100,
    },
    imageContainer:{
        width: '100%',
        backgroundColor: COLORS.secondary.gray,
        aspectRatio: 1,
        overflow: 'hidden',
        borderRadius: 12,
        marginBottom: 15
    },
    image: {
        width: '100%',
        height: '100%'
    },
    mask: {
        flex: 1,
        width: '100%',
        padding: 15,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0, 0.3)',
        alignItems: 'flex-start'
    },
    title: {
        fontSize: 20,
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-Bold',
        width: '100%',
        marginBottom: 15
    },
    text: {
        fontSize: 12,
        color: COLORS.primary.gray,
        marginBottom: 15,
        width: '100%',
        lineHeight: 20
    },
    bottomContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 20,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? '14%' : '10%',
        justifyContent: 'space-between',
        backgroundColor: COLORS.primary.white,
        position: 'absolute',
        bottom: 70
    },
    addButton: {
        flex: 1,
        width: 'auto',
        marginLeft: 15,
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
    }
})

export default Index