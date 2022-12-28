import React, { useMemo } from 'react'
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
} from 'react-native'

import { KITCHENS } from '../utils/const'

export const Kitchens = ({
    kitchens = [],
    style,
    scrollContainerStyle,
    scrollContentContainerStyle,
    imageStylem,
    imageContainerStyle,
}) => {

    if (kitchens.length === 0) {
        return null
    }

    const filteredKitchens = useMemo(() => {
        return KITCHENS.reduce((acc, kitchen) => {
            const exist = kitchens.find(item => item === kitchen.name)
            if (exist){
                acc.push(kitchen)
            }
            return acc
        }, [])
    }, [kitchens])

    return (
        <View style={[styles.wrapper, style]}>
            <ScrollView
                horizontal
                style={[styles.container, scrollContainerStyle]}
                contentContainerStyle={scrollContentContainerStyle}
                showsHorizontalScrollIndicator={false}
            >
                <View onStartShouldSetResponder={() => true} style={[styles.row, imageContainerStyle]}>
                    {
                        filteredKitchens.map((item, index) => (
                            <Image
                                key={index}
                                source={item.image}
                                style={[styles.image, imageStylem]}
                                resizeMode="contain"
                            />
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 'auto'
    },
    container: {
        width: '100%',
    },
    image: {
        width: 24,
        height: 24,
        marginRight: 10
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: -10
    },
})
