import React from 'react'
import {
    Dimensions,
    StyleSheet,
    RefreshControl,
    Image
} from 'react-native'
import { useFocusEffect } from '@react-navigation/core'

import {
    Animatedscreen,
    Button,
    // Promotions,
    Text,
    statusBar,
    Empty
} from '../../components'
import { useQuery } from '@apollo/client'
import { ScrollView } from 'react-native-gesture-handler'

import { COLORS } from '../../utils/const'
import { FIND_UNIQUE_STOCK } from '../../gqls'
import { imageUrl } from '../../utils/endpoints'

const { width, height } = Dimensions.get('screen')

const Single = ({ navigation, route }) => {

    const { promotion } = route.params

    const { data, loading, refetch, error } = useQuery(FIND_UNIQUE_STOCK, {
        variables: {
            where: { id: promotion.id }
        }
    })

    const submit = () => {
        navigation.navigate("Restaurant", { restaurant: promotion.restaurant })
    }

    useFocusEffect(() => {
        statusBar.current.setBarStyle("light-content")
        statusBar.current.setBackground(COLORS.primary.black)
    })

    const stock = data && data.findUniqueStock ? data.findUniqueStock : null

    return (
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
                    stock ? (
                        <>
                            {/* <Promotions promotion={stock} imageRsize={'contain'} /> */}
                            {
                                stock.image ? (

                                    <Image
                                        source={{ uri: imageUrl + stock.image }}
                                        style={{
                                            width: '100%',
                                            // height: 300,
                                            aspectRatio: 1 / 1,
                                            marginBottom: 15,
                                        }}
                                        resizeMode="contain"
                                    />
                                ) : null
                            }
                            <Text style={styles.restaurantName}>Акция от {stock.restaurant.name}</Text>
                            <Text style={styles.title}>{stock.name}</Text>
                            <Text style={styles.text}>{stock.description}</Text>
                        </>
                    ) : error ? (
                        <Empty
                            text="Произошла ошибка, повторите попытку"
                        />
                    ) : null
                }
            </ScrollView>
            {
                !loading ? (
                    <Button
                        text={error ? "Повторить" : "Перейти"}
                        style={styles.submit}
                        onPress={error ? refetch : submit}
                    />
                ) : null
            }
        </Animatedscreen>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        backgroundColor: COLORS.primary.white
    },
    contentContainer: {
        padding: 15,
        paddingTop: 0,
        alignItems: 'center',
        minHeight: height,
        paddingBottom: '50%'
    },
    submit: {
        position: 'absolute',
        width: width - 30,
        alignSelf: 'center',
        bottom: '10%',
    },
    restaurantName: {
        fontSize: 12,
        color: COLORS.primary.gray,
        width: '100%',
        marginVertical: 15
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        width: '100%',
        marginBottom: 15
    },
    text: {
        width: '100%',
        lineHeight: 24,
        textAlign: 'justify'
    }
})

export default Single