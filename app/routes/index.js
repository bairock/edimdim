import React, { useCallback } from 'react'
import { Alert, Linking, StyleSheet } from 'react-native'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { COLORS } from '../utils/const'

import CheckScreen from '../screens/check'
import LoginScreen from '../screens/login'
import LoginConfirmScreen from '../screens/login/confirm'
import RegistrationScreen from '../screens/registrations'
import AddressScreen from '../screens/profile/address'
import InfoScreen from '../screens/profile/info'
import CartScreen from '../screens/cart'
import FilterScreen from '../screens/home/filter'
import KitchenScreen from '../screens/home/kitchen'
import SinglePromotionsScreen from '../screens/promotions/single'
import SingleOrderScreen from '../screens/order/single'
import CreateOrderScreen from '../screens/order/create'
import RestaurantScreen from '../screens/home/restaurant'
import RestaurantInfoScreen from '../screens/home/restaurant/moreInfo'
import StoriesScreen from '../screens/home/stories'
import ProductScreen from '../screens/product'
import SearchScreen from '../screens/search'
import ProductSearchScreen from '../screens/home/restaurant/seatch'
import SelectAddressScreen from '../screens/selectAddress'
import SelectPaymentScreen from '../screens/selectPayment'
import PhoneChangeScreen from '../screens/profile/phoneChange'
import PaymentScreen from '../screens/payment'
import ReviewScreen from '../screens/review'
import AddReviewScreen from '../screens/review/add'
import CityScreen from '../screens/home/city'
import RequestScreen from '../screens/home/request'
import TabBar from './tabBar'

import {
    Button,
    Icon,
    toast
} from '../components'
import { useStateValue } from '../store'
import { useMutation } from '@apollo/client'
import { DELETE_MANY_SHIPMENT } from '../gqls'

const Stack = createStackNavigator()

export const navigationRef = createNavigationContainerRef()

export const rootNavigate = (name, params) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

const Router = () => {
    const { reducer } = useStateValue()
    const [state, dispatch] = reducer

    const [claearShipments, { loading }] = useMutation(DELETE_MANY_SHIPMENT, {
        variables: {
            where: { id: { in: state.products.map(item => item.id) } }
        },
        onCompleted: () => {
            dispatch({
                type: 'setCart',
                data: []
            })
        },
        onError: e => {
            toast.current.error('Не удалось очистить корзину')
        }
    })

    const skipLogin = useCallback((navigation) => (
        <Button
            style={styles.closeButton}
            onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.replace('TabBar')}
        >
            <Icon
                name='close'
                size={22}
                color={COLORS.primary.green}
            />
        </Button>
    ), [])

    const closeCart = useCallback((navigation) => (
        <Button
            style={styles.closeButton}
            onPress={() => navigation.navigate('HomeStack')}
        >
            <Icon
                name='close'
                size={22}
                color={COLORS.primary.black}
            />
        </Button>
    ), [])

    const clearCart = useCallback(() => state.products.length > 0 ? (
        <Button
            loading={loading}
            loadingColor={COLORS.primary.black}
            style={styles.closeButton}
            onPress={() => {
                Alert.alert(
                    // 'Очистить корзину?',
                    null,
                    'Очистить корзину?',
                    [
                        { text: 'Отмена', onPress: () => null },
                        {
                            text: 'Да',
                            onPress: claearShipments
                        },
                    ],
                    { cancelable: true }
                )
            }}
        >
            <Icon name='delete' size={25} color={COLORS.primary.black} />
        </Button>
    ) : null, [state.products, loading])

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName='Check'
                screenOptions={{
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureDirection: 'horizontal',
                    gestureEnabled: true,
                    cardOverlayEnabled: true,
                    headerBackTitleStyle: {
                        display: 'none',
                    },
                    headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0,
                        shadowOpacity: 0
                    },
                    headerTitleStyle: {
                        fontFamily: 'Montserrat-Bold'
                    },
                    cardStyle: {
                        backgroundColor: COLORS.secondary.white,
                        zIndex: 2
                    },
                    headerTintColor: COLORS.primary.black,
                    presentation: 'transparentModal'
                }}
            >
                <Stack.Screen
                    name='Check'
                    component={CheckScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                    options={({ navigation }) => ({
                        headerTitleStyle: {
                            display: 'none'
                        },
                        headerLeft: () => skipLogin(navigation)
                    })}
                />
                <Stack.Screen
                    name='Registration'
                    component={RegistrationScreen}
                    options={({ navigation }) => ({
                        headerTitleStyle: {
                            display: 'none'
                        },
                        headerLeft: () => skipLogin(navigation)
                    })}
                />
                <Stack.Screen
                    name='LoginConfirm'
                    component={LoginConfirmScreen}
                    options={({ navigation }) => ({
                        headerTitleStyle: {
                            display: 'none'
                        },
                        headerLeft: () => skipLogin(navigation)
                    })}
                    initialParams={{ phone: '' }}
                />
                <Stack.Screen
                    name='PhoneChange'
                    component={PhoneChangeScreen}
                    options={({ navigation }) => ({
                        headerTitleStyle: {
                            display: 'none'
                        },
                        headerLeft: () => skipLogin(navigation)
                    })}
                    initialParams={{ phone: '', name: '' }}
                />
                <Stack.Screen
                    name='Payment'
                    component={PaymentScreen}
                    options={{
                        title: 'Оплата',
                    }}
                    initialParams={{ uri: '' }}
                />
                <Stack.Screen
                    name='Review'
                    component={ReviewScreen}
                    options={{
                        title: 'Отзывы',
                        cardStyle: {
                            backgroundColor: COLORS.secondary.gray
                        },
                    }}
                    initialParams={{ restaurantId: '' }}
                />
                <Stack.Screen
                    name='AddReview'
                    component={AddReviewScreen}
                    options={{
                        title: 'Отзыв',
                        cardStyle: {
                            backgroundColor: COLORS.secondary.gray
                        },
                    }}
                    initialParams={{ order: null }}
                />
                <Stack.Screen
                    name='Cart'
                    component={CartScreen}
                    options={({ navigation }) => ({
                        gestureEnabled: false,
                        title: 'Корзина',
                        headerLeft: () => closeCart(navigation),
                        headerRight: clearCart
                    })}
                />
                <Stack.Screen
                    name='TabBar'
                    component={TabBar}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='Address'
                    component={AddressScreen}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.ModalSlideFromBottomIOS,
                        gestureEnabled: false,
                        cardStyle: {
                            backgroundColor: 'rgba(0,0,0,0.2)'
                        },
                        cardStyleInterpolator: ({ current: { progress } }) => ({
                            cardStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 0.5, 0.9, 1],
                                    outputRange: [0, 0.25, 0.7, 1]
                                }),
                            },
                            overlayStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.5],
                                    extrapolate: 'clamp',
                                }),
                            }
                        }),
                        presentation: 'transparentModal'
                    }}
                    initialParams={{ address: undefined }}
                />
                <Stack.Screen
                    name='City'
                    component={CityScreen}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.ModalSlideFromBottomIOS,
                        gestureEnabled: false,
                        cardStyle: {
                            backgroundColor: 'rgba(0,0,0,0.2)'
                        },
                        cardStyleInterpolator: ({ current: { progress } }) => ({
                            cardStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 0.5, 0.9, 1],
                                    outputRange: [0, 0.25, 0.7, 1]
                                }),
                            },
                            overlayStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.5],
                                    extrapolate: 'clamp',
                                }),
                            }
                        }),
                        presentation: 'transparentModal'
                    }}
                    initialParams={{ city: '' }}
                />
                <Stack.Screen
                    name='Info'
                    component={InfoScreen}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.ModalSlideFromBottomIOS,
                        gestureEnabled: false,
                        cardStyle: {
                            backgroundColor: 'rgba(0,0,0,0.2)'
                        },
                        cardStyleInterpolator: ({ current: { progress } }) => ({
                            cardStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 0.5, 0.9, 1],
                                    outputRange: [0, 0.25, 0.7, 1]
                                }),
                            },
                            overlayStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.5],
                                    extrapolate: 'clamp',
                                }),
                            }
                        }),
                        presentation: 'transparentModal'
                    }}
                />
                <Stack.Screen
                    name='Filter'
                    component={FilterScreen}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.ModalSlideFromBottomIOS,
                        gestureEnabled: false,
                        cardStyle: {
                            backgroundColor: 'rgba(0,0,0,0.2)'
                        },
                        cardStyleInterpolator: ({ current: { progress } }) => ({
                            cardStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 0.5, 0.9, 1],
                                    outputRange: [0, 0.25, 0.7, 1]
                                }),
                            },
                            overlayStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.5],
                                    extrapolate: 'clamp',
                                }),
                            }
                        }),
                        presentation: 'transparentModal'
                    }}
                    initialParams={{ filter: [], kitchen: [] }}
                />
                <Stack.Screen
                    name='Request'
                    component={RequestScreen}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.ModalSlideFromBottomIOS,
                        gestureEnabled: false,
                        cardStyle: {
                            backgroundColor: 'rgba(0,0,0,0.2)'
                        },
                        cardStyleInterpolator: ({ current: { progress } }) => ({
                            cardStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 0.5, 0.9, 1],
                                    outputRange: [0, 0.25, 0.7, 1]
                                }),
                            },
                            overlayStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.5],
                                    extrapolate: 'clamp',
                                }),
                            }
                        }),
                        presentation: 'transparentModal'
                    }}
                />
                <Stack.Screen
                    name='Kitchen'
                    component={KitchenScreen}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.ModalSlideFromBottomIOS,
                        gestureEnabled: false,
                        cardStyle: {
                            backgroundColor: 'rgba(0,0,0,0.2)'
                        },
                        cardStyleInterpolator: ({ current: { progress } }) => ({
                            cardStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 0.5, 0.9, 1],
                                    outputRange: [0, 0.25, 0.7, 1]
                                }),
                            },
                            overlayStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.5],
                                    extrapolate: 'clamp',
                                }),
                            }
                        }),
                        presentation: 'transparentModal'
                    }}
                    initialParams={{ filter: [], kitchen: [] }}
                />
                <Stack.Screen
                    name='SinglePromotions'
                    component={SinglePromotionsScreen}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.ModalSlideFromBottomIOS,
                        gestureEnabled: false,
                        cardStyle: {
                            backgroundColor: 'rgba(0,0,0,0.2)'
                        },
                        cardStyleInterpolator: ({ current: { progress } }) => ({
                            cardStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 0.5, 0.9, 1],
                                    outputRange: [0, 0.25, 0.7, 1]
                                }),
                            },
                            overlayStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.5],
                                    extrapolate: 'clamp',
                                }),
                            }
                        }),
                        presentation: 'transparentModal'
                    }}
                    initialParams={{ promotion: null }}
                />
                <Stack.Screen
                    name='RestaurantInfo'
                    component={RestaurantInfoScreen}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.ModalSlideFromBottomIOS,
                        gestureEnabled: false,
                        cardStyle: {
                            backgroundColor: 'rgba(0,0,0,0.2)'
                        },
                        cardStyleInterpolator: ({ current: { progress } }) => ({
                            cardStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 0.5, 0.9, 1],
                                    outputRange: [0, 0.25, 0.7, 1]
                                }),
                            },
                            overlayStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.5],
                                    extrapolate: 'clamp',
                                }),
                            }
                        }),
                        presentation: 'transparentModal'
                    }}
                    initialParams={{ restaurant: null }}
                />
                <Stack.Screen
                    name='Product'
                    component={ProductScreen}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.ModalSlideFromBottomIOS,
                        gestureEnabled: false,
                        cardStyle: {
                            backgroundColor: 'rgba(0,0,0,0.2)'
                        },
                        cardStyleInterpolator: ({ current: { progress } }) => ({
                            cardStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 0.5, 0.9, 1],
                                    outputRange: [0, 0.25, 0.7, 1]
                                }),
                            },
                            overlayStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.5],
                                    extrapolate: 'clamp',
                                }),
                            }
                        }),
                        presentation: 'transparentModal'
                    }}
                    initialParams={{ restaurant: null }}
                />
                <Stack.Screen
                    name='SelectAddress'
                    component={SelectAddressScreen}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.ModalSlideFromBottomIOS,
                        gestureEnabled: false,
                        cardStyle: {
                            backgroundColor: 'rgba(0,0,0,0.2)'
                        },
                        cardStyleInterpolator: ({ current: { progress } }) => ({
                            cardStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 0.5, 0.9, 1],
                                    outputRange: [0, 0.25, 0.7, 1]
                                }),
                            },
                            overlayStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.5],
                                    extrapolate: 'clamp',
                                }),
                            }
                        }),
                        presentation: 'transparentModal'
                    }}
                    initialParams={{ addresses: [] }}
                />
                <Stack.Screen
                    name='SelectPayment'
                    component={SelectPaymentScreen}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.ModalSlideFromBottomIOS,
                        gestureEnabled: false,
                        cardStyle: {
                            backgroundColor: 'rgba(0,0,0,0.2)'
                        },
                        cardStyleInterpolator: ({ current: { progress } }) => ({
                            cardStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 0.5, 0.9, 1],
                                    outputRange: [0, 0.25, 0.7, 1]
                                }),
                            },
                            overlayStyle: {
                                opacity: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.5],
                                    extrapolate: 'clamp',
                                }),
                            }
                        }),
                        presentation: 'transparentModal'
                    }}
                    initialParams={{ selectedMethod: 'online' }}
                />
                <Stack.Screen
                    name='SingleOrder'
                    component={SingleOrderScreen}
                    options={({ route }) => ({
                        title: 'Заказ',
                        headerRight: () => {
                            const { restaurant, orderStatus } = route.params.order
                            if (orderStatus !== 'canceled' && orderStatus !== 'done') {
                                if (restaurant && restaurant.addresses && restaurant.addresses.length > 0) {
                                    const first = restaurant.addresses[0]
                                    if (first && first.phones && first.phones.length > 0) {
                                        return (
                                            <Button
                                                style={styles.callButton}
                                                onPress={() => {
                                                    Linking.openURL(`tel:${first.phones[0]}`)
                                                }}
                                            >
                                                <Icon name='phone' size={25} />
                                            </Button>
                                        )
                                    }
                                }
                            }
                            return null
                        }
                    })}
                    initialParams={{ order: null }}
                />
                <Stack.Screen
                    name='CreateOrder'
                    component={CreateOrderScreen}
                    options={{
                        title: 'Оплата и доставка'
                    }}
                    initialParams={{ paymentMethod: 'online', amount: 0, addresses: [] }}
                />
                <Stack.Screen
                    name='Restaurant'
                    component={RestaurantScreen}
                    options={{
                        headerShown: false
                    }}
                    initialParams={{ restaurant: null }}
                />
                <Stack.Screen
                    name='Stories'
                    component={StoriesScreen}
                    options={{
                        headerShown: false,
                        gestureEnabled: false
                    }}
                    initialParams={{ restaurants: [] }}
                />
                <Stack.Screen
                    name='Search'
                    component={SearchScreen}
                    options={{
                        title: 'Поиск'
                    }}
                />
                <Stack.Screen
                    name='ProductSearch'
                    component={ProductSearchScreen}
                    options={{
                        title: 'Поиск по ресторану'
                    }}
                    initialParams={{ restaurant: null }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


const styles = StyleSheet.create({
    closeButton: {
        width: 'auto',
        height: 'auto',
        paddingHorizontal: 11,
        backgroundColor: 'transparent',
        paddingRight: 15
    },
    callButton: {
        width: 'auto',
        height: '100%',
        backgroundColor: 'transparent'
    }
})

export default Router