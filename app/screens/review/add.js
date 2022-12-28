import React, { useState } from "react"
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image
} from 'react-native'
import { useMutation } from "@apollo/client"

import {
    Button,
    Icon,
    Input,
    Text,
    toast
} from '../../components'

import { CREATE_ONE_REVIEW, FIND_FIRST_REVIEW } from "../../gqls"

import { COLORS } from "../../utils/const"
import { imageUrl } from "../../utils/endpoints"
import { useUser } from "../../utils/hooks"

const { width } = Dimensions.get("window")

const AddReview = ({ route, navigation }) => {
    const { order } = route.params

    const { user } = useUser()
    const stars = new Array(5).fill(false)
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState('')

    const [create, { loading }] = useMutation(CREATE_ONE_REVIEW, {
        onCompleted: () => {
            toast.current.success("Отзыв добавлен")
            navigation.goBack()
        },
        onError: e => {
            toast.current.error("Произошла ошиька, повторите попытку позже")
        },
        update: async (client, { data: { createOneReview } }) => {
            await client.writeQuery({
                query: FIND_FIRST_REVIEW,
                variables: {
                    where: {
                        orderId: { equals: order.id }
                    }
                },
                data: {
                    findFirstReview: createOneReview
                }
            })
        }
    })

    const createReview = () => {
        if (!description) {
            toast.current.info("Введите комментарий")
        }
        if (!rating) {
            toast.current.success("Поставьте оценку")
        }

        create({
            variables: {
                data: {
                    description,
                    user: {
                        connect: { id: user.id }
                    },
                    restaurant: {
                        connect: { id: order.restaurant.id }
                    },
                    order: {
                        connect: { id: order.id }
                    },
                    value: rating
                }
            }
        })
    }

    return (
        <>
            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.info}>
                    <View style={styles.row}>
                        <Text style={styles.text}>Как вам обслуживание в {order.restaurant.name}</Text>
                        <Image
                            source={{ uri: imageUrl + order.restaurant.logo }}
                            style={styles.logo}
                        />
                    </View>
                    <View style={[styles.row, { width: '70%', marginTop: 15 }]}>
                        {
                            stars.map((_, index) => (
                                <Icon
                                    key={index}
                                    name="star"
                                    size={35}
                                    color={rating ? (index + 1) <= rating ? COLORS.secondary.yellow : COLORS.primary.black : COLORS.primary.gray}
                                    onPress={() => setRating(index + 1)}
                                />
                            ))
                        }
                    </View>
                </View>
                <Input
                    value={description}
                    placeholder="Отзыв"
                    style={styles.input}
                    containerStyle={styles.input}
                    multiline
                    onChangeText={text => setDescription(text)}
                />
                <Text style={styles.note}>Постарайтесь никого не оскоблять, каждый комментарий проверяется модератором</Text>
            </ScrollView>
            <View style={styles.footer}>
                <Button
                    loading={loading}
                    text="Отправить"
                    disabled={!description}
                    onPress={createReview}
                    textStyle={{ color: !description ? COLORS.primary.gray : COLORS.primary.white }}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        width,
    },
    contentContainer: {
        alignItems: 'center',
        padding: 15
    },
    info: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: COLORS.primary.white,
        padding: 15,
        alignItems: 'center',
        marginBottom: 15
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 12
    },
    text: {
        maxWidth: '80%'
    },
    note: {
        width: '100%',
        fontSize: 12,
        color: COLORS.primary.gray,
        marginTop: 15
    },
    input: {
        height: 'auto',
        minHeight: 80,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlignVertical: 'top'
    },
    footer: {
        width,
        padding: 15,
        backgroundColor: COLORS.primary.white
    }
})

export default AddReview