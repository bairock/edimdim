import React, { useMemo } from 'react'
import {
    ScrollView,
    Dimensions,
    StyleSheet,
    ImageBackground,
    View,
    Image,
    ActivityIndicator,
    Linking
} from 'react-native'
import { useQuery } from '@apollo/client'

import {
    Button,
    Text,
    Icon
} from '../../../components'

import { FIND_MANY_REVIEW_COUNT } from '../../../gqls'

import { COLORS } from '../../../utils/const'
import { imageUrl } from '../../../utils/endpoints'
import { DateTime } from 'luxon'

const { width } = Dimensions.get('screen')

const Info = ({ navigation, restaurant }) => {

    const { data, loading } = useQuery(FIND_MANY_REVIEW_COUNT, {
        variables: {
            where: { restaurantId: { equals: restaurant.id } }
        },
        fetchPolicy: 'network-only'
    })

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            navigation.navigate("Home")
        }
    }

    const time = useMemo(() => {
        let text = '-'
        let color = COLORS.primary.gray
        let background = COLORS.secondary.gray
        if (restaurant.addresses.length > 0) {
            const allTimeExist = restaurant.addresses.find(address => address.allTime)
            const now = new DateTime.now()
            const duration = now.get("hour") * 60 + now.get("minute")
            let openExist = false
            let closeExist = true
            const address = restaurant.addresses[0]
            const start = new DateTime.fromISO(address.startWorkAt)
            const startDuration = start.get("hour") * 60 + start.get("minute")
            const end = new DateTime.fromISO(address.endWorkAt)
            const endDuration = end.get("hour") * 60 + end.get("minute")
            if (startDuration < endDuration) {
                if (startDuration < duration && duration < endDuration) {
                    openExist = true
                } else {
                    closeExist = false
                }
            } else {
                if (startDuration < duration || (duration < startDuration && duration < endDuration)) {
                    openExist = true
                    closeExist = false
                }
            }
            if (allTimeExist) {
                return {
                    text: 'Круглосуточно',
                    color: COLORS.primary.green,
                    background: COLORS.secondary.green
                }
            }
            if (openExist) {
                return {
                    text: `${new DateTime.fromISO(address.startWorkAt).toFormat("HH:mm")} - ${new DateTime.fromISO(address.endWorkAt).toFormat("HH:mm")}`,
                    color: COLORS.primary.green,
                    background: COLORS.secondary.green
                }
            }
            if (closeExist) {
                return {
                    text: `Закрыто до ${new DateTime.fromISO(address.startWorkAt).toFormat("HH:mm")}`,
                    color,
                    background
                }
            }
        }
        return {
            text,
            color,
            background
        }
    }, [restaurant])

    const reviewCount = useMemo(() => data && data.findManyReviewCount ? data.findManyReviewCount : 0, [data])
    const { phones, ...address } = useMemo(() => restaurant.addresses[0], [])

    return (
        <ImageBackground
            source={{ uri: imageUrl + restaurant.image }}
            style={styles.backlImage}
        >
            <View style={styles.mask}>
                <View style={styles.controls}>
                    <Button
                        onPress={goBack}
                        style={styles.circle}
                    >
                        <Icon name="arrow-left" size={20} color={COLORS.primary.black} style={{ marginLeft: -2 }} />
                    </Button>
                    <Button onPress={() => navigation.navigate("ProductSearch", { restaurant })} style={styles.circle}>
                        <Icon name="search" size={15} color={COLORS.primary.gray} />
                    </Button>
                </View>
                <View style={styles.info}>
                    <View style={styles.row}>
                        <Image
                            source={{ uri: imageUrl + restaurant.logo }}
                            resizeMode="cover"
                            style={styles.logo}
                        />
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{restaurant.name}</Text>
                            <Text style={styles.rating}><Icon name="star" size={20} color={COLORS.primary.black} /> {restaurant.average ? parseFloat(restaurant.average).toFixed(2) : 0} ({reviewCount})</Text>
                        </View>
                    </View>
                    <ScrollView
                        style={styles.items}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View onStartShouldSetResponder={() => true} style={styles.itemsContainer}>
                            <Button onPress={() => navigation.navigate("Review", { restaurantId: restaurant.id })} style={styles.item}>
                                <Text style={styles.title}>Отзывы</Text>
                                {
                                    loading ? (
                                        < ActivityIndicator
                                            color={COLORS.primary.green}
                                            size="small"
                                        />
                                    ) : (
                                        <Text style={styles.subtitle}><Icon name="messages" color={COLORS.primary.green} size={12} /> {reviewCount}</Text>
                                    )
                                }
                            </Button>
                            <View style={styles.item}>
                                <Text style={styles.title}>Оплата</Text>
                                <Text style={styles.subtitle}>
                                    <Icon name="cash" color={COLORS.primary.green} size={15} /> <Icon name="card" color={COLORS.primary.green} size={15} />
                                </Text>
                            </View>
                            <Button
                                onPress={() => navigation.navigate("RestaurantInfo", { restaurant })}
                                style={styles.item}
                            >
                                <Text style={styles.title}>Режим работы</Text>
                                <Text style={[styles.subtitle, { color: time.color }]}>
                                    {time.text}
                                </Text>
                            </Button>
                        </View>
                    </ScrollView>
                    <View style={[styles.row, { paddingTop: 0 }]}>
                        <Button
                            text={"Подробнее о компании"}
                            style={styles.more}
                            textStyle={styles.moreText}
                            onPress={() => navigation.navigate("RestaurantInfo", { restaurant })}
                        />
                        {/* <Button
                            style={styles.call}
                            onPress={() => Linking.openURL(`tel:${phones[0]}`)}
                        >
                            <Icon name="phone" size={20} />
                        </Button> */}
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({

    backlImage: {
        flex: 1,
        width,
    },
    mask: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0, 0.3)',
        padding: 15
    },
    controls: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    circle: {
        backgroundColor: COLORS.primary.white,
        width: 35,
        height: 35,
        borderRadius: 17.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 0
    },
    info: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255, 0.6)',
        // padding: 15,
        borderRadius: 12
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 12
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    nameContainer: {
        marginLeft: 15
    },
    name: {
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        marginBottom: 5,
        justifyContent: 'center'
    },
    rating: {
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        textAlignVertical: 'center'
    },
    items: {
        width: "100%"
    },
    itemsContainer: {
        padding: 15,
        paddingTop: 0,
        paddingRight: 0,
        flexDirection: 'row',
    },
    item: {
        backgroundColor: COLORS.primary.white,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginRight: 10,
        width: 'auto',
        height: 50
    },
    title: {
        width: '100%',
        fontSize: 12,
        color: COLORS.primary.gray,
        marginBottom: 5
    },
    subtitle: {
        width: '100%',
        fontSize: 12,
        color: COLORS.primary.green
    },
    more: {
        backgroundColor: COLORS.primary.white,
        flex: 1,
        width: 'auto',
        marginRight: 10,
        height: 50
    },
    moreText: {
        color: COLORS.primary.black
    },
    call: {
        backgroundColor: COLORS.primary.white,
        width: 50,
        height: 50
    },
})

export default Info