import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {
    View,
    Dimensions,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    RefreshControl
} from 'react-native'
import { useFocusEffect } from '@react-navigation/core'

import {
    Animatedscreen,
    Button,
    Input,
    Text,
    toast,
    statusBar
} from '../../components'
import { UPDATE_ONE_USER } from '../../gqls'

import { COLORS } from '../../utils/const'
import { useUser } from '../../utils/hooks'
import { pointToAddress, getSuggest } from '../../utils/dadata'
import { useStateValue } from '../../store'
import AsyncStorage from '@react-native-community/async-storage'

const { width, height } = Dimensions.get('screen')

let inputTimeout

const Address = ({ navigation, route }) => {

    const { address } = route.params
    const { user } = useUser()
    const { reducer } = useStateValue()
    const [street, setStreet] = useState("")
    const [entry, setEntry] = useState("")
    const [apartment, setApartment] = useState("")
    const [code, setCode] = useState("")
    const [floor, setFloor] = useState("")
    const [addressLoading, setAddressLoading] = useState(false)
    const [suggestionsList, setSuggestionsList] = useState([])
    const [city, setCity] = useState('')

    const [state, dispatch] = reducer

    useEffect(() => {
        if (address) {
            const arr = address.split(', ')
            setStreet(arr[0].replace("ул. ", ""))
            for (let item of arr) {
                if (item.includes("п. ", "")) {
                    setEntry(item.replace("п. ", ""))
                }
                if (item.includes('кв. ')) {
                    setApartment(item.replace("кв. ", ""))
                }
                if (item.includes('домофон ')) {
                    setCode(item.replace("домофон ", ""))
                }
                if (item.includes("эт. ")) {
                    setFloor(item.replace("эт. ", ""))
                }
            }
        } else if (state.position) {
            setAddressLoading(true)
            pointToAddress(state.position).then(response => response.json()).then(result => {
                const { suggestions } = result
                if (suggestions.length > 0) {
                    const { data } = suggestions[0]
                    const suggestAddresses = suggestions.reduce((acc, item) => {
                        if (item && item.data && item.data.street_with_type && item.data.house) {
                            acc.push(item.data.street_with_type + ' ' + item.data.house)
                        }
                        return acc
                    }, [])
                    setSuggestionsList(suggestAddresses)
                    // setSuggestionsList(suggestions.map(item => item.data ? item.data.street_with_type + ' ' + item.data.house : ''))
                    if (!street) {
                        setStreet(data && data.street_with_type ? data.street_with_type + ' ' + data.house : '')
                    }
                }
                setAddressLoading(false)
            }).catch(e => {
                console.error(e)
                setAddressLoading(false)
            })
        }
        getCity()
    }, [])

    const getCity = async () => {
        let _city = await AsyncStorage.getItem('city')
        if (_city) {
            let cityArray = _city.split(", ")
            if (cityArray.length > 1) {
                _city = cityArray[1]
            } else {
                _city = cityArray[0]
            }
            setCity(_city)
        }
    }

    useFocusEffect(() => {
        statusBar.current.setBarStyle("light-content")
        statusBar.current.setBackground(COLORS.primary.black)
    })

    const [update, { loading }] = useMutation(UPDATE_ONE_USER, {
        onCompleted: () => {
            toast.current.info("Адрес добавлен")
            navigation.goBack()
        },
        onError: e => {
            toast.current.error("Что то пошло не так, повторите попытку позже.")
        }
    })

    const submit = () => {
        if (!street) {
            return toast.current.info("Введите улицу")
        }
        let addressString = `ул. ${street}`
        if (entry) {
            addressString = `${addressString}, п. ${entry}`
        }
        if (apartment) {
            addressString = `${addressString}, кв. ${apartment}`
        }
        if (code) {
            addressString = `${addressString}, домофон ${code}`
        }
        if (floor) {
            addressString = `${addressString}, эт. ${floor}`
        }
        if (user) {
            let addresses = [...user.addresses].filter(item => item !== address)
            update({
                variables: {
                    where: { id: user.id },
                    data: {
                        addresses: [addressString, ...addresses]
                    }
                }
            })
        } else {
            dispatch({
                type: 'setAddress',
                data: addressString
            })
            navigation.goBack()
        }
    }

    const remove = () => {
        if (user) {
            let addresses = [...user.addresses].filter(item => item !== address)
            update({
                variables: {
                    where: { id: user.id },
                    data: {
                        addresses
                    }
                }
            })
        } else {
            dispatch({
                type: 'setAddress',
                data: null
            })
            navigation.goBack()
        }
    }

    const onChnageStreet = (text) => {
        setStreet(text)
        clearTimeout(inputTimeout)
        inputTimeout = setTimeout(async () => {
            if (text) {
                setAddressLoading(true)
                let query = city ? city + ' ' + text : text
                console.log(query, city)
                getSuggest(query).then(response => response.json()).then(result => {
                    const { suggestions } = result
                    const suggestAddresses = suggestions.reduce((acc, item) => {
                        if (item && item.data && item.data.street_with_type && item.data.house) {
                            acc.push(item.data.street_with_type + ' ' + item.data.house)
                        }
                        return acc
                    }, [])
                    if (suggestAddresses) {
                        setSuggestionsList(suggestAddresses)
                    }
                    setAddressLoading(false)
                }).catch(e => {
                    setAddressLoading(false)
                    console.error(e)
                })
            }
            clearTimeout(inputTimeout)
        }, 1300)
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="heigh"
        >
            <Animatedscreen
                offset={height / 2.5}
                onBottomLimit={() => navigation.goBack()}
            >
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    keyboardShouldPersistTaps="handled"
                    refreshControl={
                        <RefreshControl
                            refreshing={addressLoading}
                        />
                    }
                >
                    {/* <Text style={styles.title}>Адрес доставки</Text> */}
                    <Text style={styles.title}>Добавить адрес</Text>
                    <Input
                        value={street}
                        onChangeText={text => onChnageStreet(text)}
                        placeholder="Улица"
                        label="Улица"
                        containerStyle={styles.input}
                        listData={suggestionsList}
                        onSleectListData={item => setStreet(item)}
                    />
                    <View style={styles.row}>
                        <Input
                            value={entry}
                            onChangeText={text => setEntry(text)}
                            placeholder="Подъезд"
                            label="Подъезд"
                            containerStyle={styles.half}
                        />
                        <Input
                            value={apartment}
                            onChangeText={text => setApartment(text)}
                            containerStyle={styles.half}
                            placeholder="Кв./Офис"
                            label="Кв./Офис"
                        />
                    </View>
                    <View style={styles.row}>
                        <Input
                            value={code}
                            onChangeText={text => setCode(text)}
                            placeholder="Домофон"
                            label="Домофон"
                            containerStyle={styles.half}
                        />
                        <Input
                            value={floor}
                            onChangeText={text => setFloor(text)}
                            containerStyle={styles.half}
                            placeholder="Этаж"
                            label="Этаж"
                        />
                    </View>
                    <Button
                        text={address ? "Сохранить" : "Добавить"}
                        onPress={submit}
                        loading={loading}
                    />
                    {
                        address ? (
                            <Button
                                text={"Удалить"}
                                style={styles.delete}
                                textStyle={{ color: COLORS.secondary.red }}
                                onPress={remove}
                                loading={loading}
                                loadingColor={COLORS.secondary.red}
                            />
                        ) : null
                    }
                </ScrollView>
            </Animatedscreen>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
    },
    contentContainer: {
        alignItems: 'center',
        padding: 15,
        paddingTop: 0
    },
    title: {
        fontSize: 20,
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-Bold',
        width: '100%',
        marginBottom: 24
    },
    input: {
        marginBottom: 24,
    },
    half: {
        width: '48%',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        zIndex: 1
    },
    delete: {
        marginTop: 15,
        backgroundColor: 'transparent',
        borderColor: COLORS.secondary.red,
        borderWidth: 1
    }
})

export default Address