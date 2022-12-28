import React from 'react'
import {
    ScrollView,
    Dimensions,
    StyleSheet
} from 'react-native'
import { Button } from '../../../components'
import { COLORS } from '../../../utils/const'

const { width, height } = Dimensions.get('screen')

const Categories = ({
    categories = [],
    onSelect = () => { },
    selectedCategory = undefined
}) => {

    if (!categories.length === 0) {
        return null
    }

    return (
        <ScrollView
            horizontal
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsHorizontalScrollIndicator={false}
        >
            {
                categories.map(item => (
                    <Button
                        key={item}
                        text={item}
                        onPress={() => onSelect(item)}
                        style={[
                            styles.category,
                            selectedCategory && item === selectedCategory ?
                                {
                                    backgroundColor: COLORS.secondary.green
                                }
                                : null
                        ]}
                        textStyle={[
                            styles.categoryText,
                            selectedCategory && item === selectedCategory ?
                                {
                                    color: COLORS.primary.green
                                }
                                : null
                        ]}
                    />
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: COLORS.secondary.white
    },
    contentContainer: {
        paddingVertical: 15,
        paddingLeft: 15
    },
    category: {
        width: 'auto',
        marginRight: 10,
        backgroundColor: COLORS.primary.white
    },
    categoryText: {
        color: COLORS.primary.black
    }
})

export default Categories