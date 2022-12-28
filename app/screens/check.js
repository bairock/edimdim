import AsyncStorage from '@react-native-community/async-storage'
import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native'

import { useUser } from '../utils/hooks'

const Check = ({ navigation }) => {

    useUser({
        onCompleted: async ({ findMeUser }) => {
            if (!findMeUser) {
                await AsyncStorage.removeItem('token')
            }
            navigation.replace("TabBar")
        },
        onError: async () => {
            await AsyncStorage.removeItem('token')
            navigation.replace("TabBar")
        },
    })

    return (
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default Check