import React, { useMemo } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import HomeScreen from '../screens/home'

import { COLORS } from '../utils/const'
import {
    Button,
    Icon,
    Text
} from '../components'
import { rootNavigate } from '.'
import { useStateValue } from '../store'
import { useUser } from '../utils/hooks'

const Stack = createStackNavigator()
const { width } = Dimensions.get("screen")

const HomeStack = () => {
    const { reducer } = useStateValue()
    const [state, _] = reducer
    const { address } = state
    const { user } = useUser()

    const onPressAddress = () => {
        if (address && user) {
            rootNavigate("SelectAddress")
        } else {
            rootNavigate("Address", { address })
        }
    }

    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                gestureDirection: 'horizontal',
                gestureEnabled: true,
                headerBackTitleStyle: {
                    display: 'none',
                },
                headerStyle: {
                    backgroundColor: COLORS.primary.green,
                    elevation: 0,
                    shadowOpacity: 0
                },
                headerTitleStyle: {
                    fontFamily: 'Montserrat-Bold'
                },
                cardStyle: {
                    backgroundColor: COLORS.secondary.white
                },
                headerTintColor: COLORS.primary.white
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation, route }) => ({
                    headerLeftContainerStyle: {
                        paddingHorizontal: 15,
                        width
                    },
                    headerTitleContainerStyle: {
                        display: "none"
                    },
                    headerRightContainerStyle: {
                        display: "none"
                    },
                    headerLeft: () => (
                        <Button
                            style={styles.address}
                            onPress={onPressAddress}
                        >
                            <Icon name="location" size={25} color={COLORS.primary.white} />
                            <Text numberOfLines={1} style={styles.addressText}>{address ? address : 'Адрес доставки'}</Text>
                        </Button>
                    ),
                    headerLeftContainerStyle: { width, paddingHorizontal: 15 }
                })}
                initialParams={{ filter: [], kitchen: [], city: 'Якутск' }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    address: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 0,
        width: "100%",
        backgroundColor: 'transparent'
    },
    addressText: {
        color: COLORS.primary.white,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 5,
        width: '90%'
    }
})

export default HomeStack
