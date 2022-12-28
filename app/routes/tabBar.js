import React, { useEffect, useMemo } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeStack from './homeStack'
import ProfileStack from './profileStack'
import OrderStack from './orderStack'
import PromotionsStack from './promotionsStack'
import StubScreen from '../screens/cart/stub'

import {
    Icon
} from '../components'

import { COLORS } from '../utils/const'
import { useStateValue } from '../store'

const BottomTab = createBottomTabNavigator()

const TabBar = (props) => {

    const { reducer } = useStateValue()
    const [state, _] = reducer
    const { products } = state

    const cartCount = useMemo(() => {
        if (products.length === 0){
            return null
        }
        if (products.length > 100) {
            return '+99'
        }
        return products.length
    }, [products.length])

    return (
        <BottomTab.Navigator
            initialRouteName={'HomeStack'}
            screenOptions={{
                headerBackTitleStyle: {
                    display: 'none'
                },
                cardStyle: {
                    backgroundColor: COLORS.secondary.white
                },
                tabBarActiveTintColor: COLORS.primary.green,
                tabBarInactiveTintColor: COLORS.primary.gray,
                tabBarActiveBackgroundColor: COLORS.primary.white,
                tabBarInactiveBackgroundColor: COLORS.primary.white,
                tabBarLabelStyle: {
                    fontFamily: 'Montserrat-Regular'
                }
            }}
            safeAreaInsets={false}
        >
            <BottomTab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    title: 'Главная',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={color}
                            name="home"
                            size={25}
                        />
                    )
                }}
            />
            <BottomTab.Screen
                name="PromotionsStack"
                component={PromotionsStack}
                options={{
                    title: 'Акции',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={color}
                            name="gear"
                            size={25}
                        />
                    )
                }}
            />
            <BottomTab.Screen
                name="StubScreen"
                component={StubScreen}
                options={{
                    title: 'Корзина',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={color}
                            name="cart"
                            size={25}
                        />
                    ),
                    tabBarBadge: cartCount,
                    tabBarBadgeStyle: {
                        backgroundColor: COLORS.primary.green,
                        fontSize: 13,
                        fontFamily: 'Montserrat-SemiBold'
                    },
                }}
            />
            <BottomTab.Screen
                name="OrderStack"
                component={OrderStack}
                options={{
                    title: 'Заказы',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={color}
                            name="orders"
                            size={25}
                        />
                    )
                }}
            />
            <BottomTab.Screen
                name="ProfileStack"
                component={ProfileStack}
                options={{
                    title: 'Профиль',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={color}
                            name="profile"
                            size={25}
                        />
                    )
                }}
            />
        </BottomTab.Navigator>
    )
}

export default TabBar
