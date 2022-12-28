import React, { useCallback, useMemo } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import PromotionsScreen from '../screens/promotions'

import { COLORS } from '../utils/const'

const Stack = createStackNavigator()

const PromotionsStack = () => {

    const cityName = useCallback((city) => {
        if (city) {
            let cityArray = city.split(", ")
            if (cityArray.length > 1) {
                return cityArray[1]
            } else {
                return cityArray[0]
            }
        }
        return ''
    }, [])

    return (
        <Stack.Navigator
            initialRouteName="Promotions"
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
                name="Promotions"
                component={PromotionsScreen}
                options={({ route }) => ({
                    title: 'Акции ' + cityName(route.params.city),
                })}
                initialParams={{ city: 'Якутск' }}
            />
        </Stack.Navigator>
    )
}

export default PromotionsStack
