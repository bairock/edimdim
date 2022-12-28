import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import OrderScreen from '../screens/order'

import { COLORS } from '../utils/const'

const Stack = createStackNavigator()

const OrderStack = () => {

    return (
        <Stack.Navigator
            initialRouteName="Order"
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                gestureDirection: 'horizontal',
                gestureEnabled: true,
                headerBackTitleStyle: {
                    display: 'none',
                },
                headerStyle: {
                    backgroundColor: COLORS.secondary.white,
                    elevation: 0,
                    shadowOpacity: 0
                },
                headerTitleStyle: {
                    fontFamily: 'Montserrat-Bold'
                },
                cardStyle: {
                    backgroundColor: COLORS.secondary.white
                },
                headerTintColor: COLORS.primary.black,
            }}
        >
            <Stack.Screen
                name="Order"
                component={OrderScreen}
                options={{
                    title: 'История заказов'
                }}
            />
        </Stack.Navigator>
    )
}

export default OrderStack
