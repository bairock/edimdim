import React, { useEffect } from 'react'
import {
    Platform,
    UIManager,
} from 'react-native'
import OneSignal from 'react-native-onesignal'
import { AppRegistry } from 'react-native'
import { ApolloProvider } from '@apollo/client'
import 'react-native-gesture-handler'

import Router from './routes'
import { Toast, SafeAreaView } from './components'
import { name as appName } from './app.json'
import client from './utils/apollo'
import StateProvider from './store'

const App = () => {

    useEffect(() => {
        OneSignal.setAppId('c2baad38-4e30-4003-bb65-fb2d7d1f3ea0')
        OneSignal.setLogLevel(6, 0)
        OneSignal.setRequiresUserPrivacyConsent(false)
        if (Platform.OS === 'ios') {
            OneSignal.promptForPushNotificationsWithUserResponse((response) => {
                console.log("response", response)
            })
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }, [])

    return (
        <SafeAreaView>
            <ApolloProvider client={client}>
                <StateProvider>
                    <Router />
                    <Toast />
                </StateProvider>
            </ApolloProvider>
        </SafeAreaView>
    )
}

AppRegistry.registerComponent(appName, () => App)
