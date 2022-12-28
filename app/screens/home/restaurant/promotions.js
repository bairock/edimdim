import React, { useMemo } from 'react'
import {
    ScrollView,
    Dimensions,
    StyleSheet,
    View
} from 'react-native'
import { useQuery } from '@apollo/client'
import { DateTime } from 'luxon'

import {
    Promotions
} from '../../../components'
import { FIND_MANY_STOCK } from '../../../gqls'
import { COLORS } from '../../../utils/const'

const { width, height } = Dimensions.get('screen')

const RestaurantPromotions = ({ restaurant }) => {

    const variables = useMemo(() => ({
        where: {
            restaurantId: { equals: restaurant.id },
            delete: { equals: false },
            endAt: { gt: new DateTime.local() },
        }
    }), [])

    const { data, loading } = useQuery(FIND_MANY_STOCK, {
        variables,
        fetchPolicy: "network-only"
    })

    const promotions = useMemo(() => data && data.findManyStock ? data.findManyStock : [], [data])

    if (promotions.length === 0) {
        return null
    }

    return (
        <ScrollView
            horizontal
            style={styles.promotions}
            contentContainerStyle={styles.contentContainer}
            showsHorizontalScrollIndicator={false}
        >
            {
                promotions.map((item, index) => (
                    <View
                        key={index}
                        onStartShouldSetResponder={() => true}
                        style={styles.promotionItem}
                    >
                        <Promotions
                            promotion={item}
                        />
                    </View>
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    promotions: {
        width: '100%',
        backgroundColor: COLORS.secondary.white
    },
    contentContainer: {
        paddingTop: 15,
        paddingLeft: 15
    },
    promotionItem: {
        marginRight: 15,
        width: width / 1.5,
    }
})

export default RestaurantPromotions