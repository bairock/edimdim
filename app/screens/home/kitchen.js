import React, { useCallback, useMemo, useState } from 'react'
import {
    Image,
    Dimensions,
    StyleSheet,
    View,
    LayoutAnimation,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/core'

import {
    Animatedscreen,
    Button,
    FlatList,
    Text,
    statusBar
} from '../../components'

import { KITCHENS, COLORS } from '../../utils/const'

const { width, height } = Dimensions.get('screen')

const Kitchen = ({ navigation, route }) => {

    const { kitchen: _kitchen } = route.params
    const [kitchen, setKitchen] = useState(_kitchen)

    const isFiltered = useMemo(() => kitchen.length > 0, [kitchen])

    useFocusEffect(() => {
        statusBar.current.setBarStyle("light-content")
        statusBar.current.setBackground(COLORS.primary.black)
    })

    const toggleKitchen = (item) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        if (kitchen.find(k => k === item.name)) {
            const newKitchen = kitchen.filter(k => k !== item.name)
            setKitchen(newKitchen)
        } else {
            setKitchen([...kitchen, item.name])
        }
    }

    const submit = () => {
        navigation.navigate({
            name: "Home",
            params: { kitchen },
            merge: true
        })
    }

    const clearKitchen = () => {
        navigation.navigate({
            name: "Home",
            params: { kitchen: [] },
            merge: true
        })
    }

    const keyExtractor = useCallback((item) => item.name, [])

    const renderItem = useCallback(({ item, index }) => (
        <Button
            key={item.name}
            style={[
                styles.item,
                {
                    marginHorizontal: (index + 2) % 3 == 0 ? 7 : null,
                    borderColor: kitchen.find(k => k === item.name) ? COLORS.primary.green : 'transparent'
                }
            ]}
            onPress={() => toggleKitchen(item)}
        >
            <Image
                source={item.image}
                style={styles.icon}
                resizeMode='contain'
            />
            <Text style={styles.itemText}>{item.name}</Text>
        </Button>
    ), [navigation, kitchen])

    return (
        <Animatedscreen
            offset={15}
            closeOffset={height / 4}
            onBottomLimit={() => navigation.goBack()}
        >
            <FlatList
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                data={KITCHENS}
                keyExtractor={keyExtractor}
                numColumns={3}
                renderItem={renderItem}
            />
            <View style={styles.row}>
                {
                    isFiltered > 0 ? (
                        <Button
                            text="Сбросить"
                            style={[styles.clear, { width: isFiltered ? '48%' : '100%' }]}
                            textStyle={styles.clearText}
                            onPress={clearKitchen}
                        />
                    ) : null
                }
                <Button
                    text="Применить"
                    style={{ width: isFiltered ? '48%' : '100%' }}
                    onPress={submit}
                />
            </View>
        </Animatedscreen>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        backgroundColor: COLORS.primary.white,
    },
    contentContainer: {
        padding: 15,
        paddingHorizontal: 14,
        paddingTop: 0,
        // alignItems: 'center',
        minHeight: height,
    },
    title: {
        fontSize: 20,
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-Bold',
        width: '100%',
        marginBottom: 24
    },
    item: {
        flex: 1,
        backgroundColor: COLORS.secondary.white,
        marginBottom: 7,
        height: height / 10.5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 12,
        borderWidth: 1
    },
    itemText: {
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold'
    },
    row: {
        width: width - 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: '10%',
        alignSelf: 'center'
    },
    clear: {
        backgroundColor: COLORS.secondary.gray
    },
    clearText: {
        color: COLORS.primary.black
    },
    icon: {
        width: 24,
        height: 24,
        marginBottom: 8
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 120
    }
})

export default Kitchen