import React, { useMemo } from "react"
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    RefreshControl
} from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"
import { ScrollView } from "react-native-gesture-handler"
import { useQuery } from "@apollo/client"
import { useFocusEffect } from "@react-navigation/native"

import {
    Animatedscreen,
    statusBar,
    Text
} from '../../components'
import { COLORS } from "../../utils/const"
import { FIND_MANY_RESTAURANT } from "../../gqls"

const { width, height } = Dimensions.get("screen")

const City = ({ navigation, route }) => {

    const { city } = route.params
    const { data, loading, refetch } = useQuery(FIND_MANY_RESTAURANT, {
        variables: {
            where: {
                delete: { equals: false },
                city: { not: { equals: null } }
            },
            distinct: ['city']
        },
        fetchPolicy: 'network-only'
    })

    const restaurants = useMemo(() => data ? data.findManyRestaurant : [], [data])

    const selectCity = async (_city) => {
        await AsyncStorage.setItem('city', _city)
        navigation.navigate('Home', { city: _city })
    }

    useFocusEffect(() => {
        statusBar.current.setBarStyle("light-content")
        statusBar.current.setBackground(COLORS.primary.black)
    })

    return (
        <>
            <Animatedscreen
                offset={15}
                closeOffset={height / 4}
                onBottomLimit={() => navigation.goBack()}
            >
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={refetch}
                        />
                    }
                >
                    {
                        restaurants.map(item => (
                            <TouchableWithoutFeedback
                                key={item.id}
                                onPress={() => selectCity(item.city)}
                            >
                                <View
                                    style={[
                                        styles.cityContainer,
                                        {
                                            borderColor: city === item.city ? COLORS.primary.green : COLORS.secondary.gray,
                                        }
                                    ]}
                                >
                                    <Text
                                        style={styles.cityText}
                                    >
                                        {item.city}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                    }
                </ScrollView>
            </Animatedscreen>
        </>
    )
}

export default City

const styles = StyleSheet.create({
    row: {
        width: width - 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 15,
        alignSelf: 'center'
    },
    clear: {
        backgroundColor: COLORS.secondary.gray
    },
    clearText: {
        color: COLORS.primary.black
    },
    contentContainer: {
        alignItems: 'center',
        paddingBottom: 75,
        padding: 15
    },
    container: {
        flex: 1,
        width,
        minHeight: height,
        backgroundColor: COLORS.primary.white
    },
    cityContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.secondary.gray,
        marginBottom: 15
    },
    cityText: {
        flex: 1,
        width: '100%',
        fontSize: 15
    }
})