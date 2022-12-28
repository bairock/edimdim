import { DateTime } from 'luxon'
import React, { useMemo } from 'react'
import {
    ScrollView,
    Dimensions,
    StyleSheet,
    View,
    Linking
} from 'react-native'
import IMask from 'imask'

import {
    Animatedscreen,
    Button,
    Text,
    Kitchens
} from '../../../components'

import { COLORS, IMAGES } from '../../../utils/const'

const { width, height } = Dimensions.get('screen')

const Moreinfo = ({ route, navigation }) => {
    const { restaurant } = route.params

    return (
        <Animatedscreen
            offset={15}
            closeOffset={height / 4}
            onBottomLimit={() => navigation.goBack()}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <Text style={styles.title}>Описание</Text>
                <Text style={styles.text}>{restaurant.description}</Text>
                <Text style={styles.title}>Кухни</Text>
                <Kitchens kitchens={restaurant.categories} style={styles.kitchens} />
                <Text style={styles.title}>Адреса</Text>
                {
                    restaurant.addresses.map(item => (
                        <View key={item.id} style={styles.addresses}>
                            <Text style={styles.text}>{item.value}</Text>
                            <View style={styles.row}>
                                <Text style={[styles.text, { maxWidth: '48%' }]}>Режим работы</Text>
                                <Button
                                    text={item.allTime ? 'Круглосуточно' : `${new DateTime.fromISO(item.startWorkAt).toFormat("HH:mm")} - ${new DateTime.fromISO(item.endWorkAt).toFormat("HH:mm")}`}
                                    style={styles.time}
                                    textStyle={styles.timeText}
                                />
                            </View>
                            {
                                item.phones.map(phone => (
                                    <Text
                                        key={phone}
                                        onPress={() => Linking.openURL(`tel:${phone}`)}
                                        style={styles.phone}
                                    >
                                        {phone}
                                    </Text>
                                ))
                            }
                            {/* <Butto */}
                        </View>
                    ))
                }
                <Text style={styles.title}>Условия доставки</Text>
                <Text style={styles.text}>
                    {restaurant.deliveryCondition}
                </Text>
                {/* <Text style={styles.text}>
                    С 07:00-00:00 ч. доставка бесплатная.
                    С 00:00-07:00 ч. доставка платная, стоимость и время ожидания уточняйте  у операторов.
                    Сумма минимального заказа  с учетом скидок и акции зависит от района доставки
                </Text> */}
                <Text style={styles.title}>Оплата</Text>
                <Text style={styles.text}>Карта и наличные</Text>
                <Text style={styles.title}>Юридическая информация</Text>
                <Text style={styles.text}>{restaurant.legalInformation}</Text>
            </ScrollView>
        </Animatedscreen>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        backgroundColor: COLORS.primary.white,
        height
    },
    contentContainer: {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBottom: 115
    },
    title: {
        fontSize: 20,
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-Bold',
        width: '100%',
        marginBottom: 15
    },
    text: {
        fontSize: 12,
        color: COLORS.primary.gray,
        marginBottom: 15,
        width: '100%'
    },
    kitchens: {
        marginBottom: 15,
    },
    addresses: {
        width: '100%'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'nowrap'
    },
    time: {
        width: 'auto',
        height: 25,
        backgroundColor: COLORS.secondary.green
    },
    timeText: {
        fontSize: 12,
        color: COLORS.primary.green
    },
    phone: {
        fontSize: 12,
        color: COLORS.primary.green,
        marginBottom: 15,
    },
    moreAdress: {
        backgroundColor: COLORS.secondary.gray,
        marginBottom: 15,
    },
    moreAdressText: {
        color: COLORS.primary.black,
    }
})

export default Moreinfo