import React from 'react'
import {
    StyleSheet,
    Alert
} from 'react-native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import AsyncStorage from '@react-native-community/async-storage'
import { useApolloClient } from '@apollo/client'

import ProfileScreen from '../screens/profile'

import { FIND_ME_USER } from '../gqls'

import { COLORS } from '../utils/const'
import { Button, Icon } from '../components'
import { useUser } from '../utils/hooks'
import { rootNavigate } from '.'

const Stack = createStackNavigator()

const ProfileStack = () => {

    const { user } = useUser()
    const client = useApolloClient()

    const logout = () => {
        Alert.alert(
            'Выход',
            'Выйти из аккаунта?',
            [
                { text: 'Отмена', onPress: () => null },
                {
                    text: 'Да',
                    onPress: async () => {
                        await client.writeQuery({
                            query: FIND_ME_USER,
                            data: {
                                findMeUser: null
                            }
                        })
                        await AsyncStorage.removeItem('token')
                        rootNavigate("Login")
                    }
                },
            ],
            { cancelable: false }
        )
    }

    return (
        <Stack.Navigator
            initialRouteName="Profile"
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
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Профиль',
                    headerRight: user ? () => (
                        <Button
                            style={styles.logout}
                            onPress={logout}
                        >
                            <Icon
                                name="logout"
                                color={COLORS.primary.black}
                                size={22}
                            />
                        </Button>
                    ) : null
                }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    logout: {
        width: 'auto',
        height: 'auto',
        padding: 10,
        backgroundColor: 'transparent'
    }
})

export default ProfileStack
