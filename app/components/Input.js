import React, { forwardRef, useCallback, useMemo, useState } from 'react'
import {
    StyleSheet,
    TextInput,
    View,
    ScrollView,
    Keyboard
} from 'react-native'

import { Button, Text } from '.'

import { COLORS } from '../utils/const'

export const Input = forwardRef(({
    containerStyle,
    right = null,
    left = null,
    style,
    onFocus = () => { },
    onBlur = () => { },
    label = undefined,
    labelContainerStyle,
    labelStyle,
    editable = true,
    placeholder = "",
    value = "",
    disabledStyle = styles.disabled,
    listData = [],
    onSleectListData = () => { },
    ...props
}, ref) => {

    const [focus, setFocus] = useState(false)

    const onFocusFunc = useCallback(() => {
        setFocus(true)
        onFocus()
    }, [onFocus])

    const onBlurFunc = useCallback(() => {
        setFocus(false)
        onBlur()
    }, [onBlur])

    const onSelect = (item) => {
        onSleectListData(item)
        Keyboard.dismiss()
    }

    const showLabel = useMemo(() => label && (focus || value), [label, focus, value])
    const showList = useMemo(() => listData.length > 0 && focus, [label, focus])

    return (
        <View
            style={[
                styles.container,
                focus ? styles.focused : undefined,
                containerStyle,
            ]}
        >
            {left}
            <TextInput
                ref={ref}
                value={value}
                onFocus={onFocusFunc}
                onBlur={onBlurFunc}
                style={[
                    styles.input,
                    editable === false ? disabledStyle : undefined,
                    style,
                ]}
                placeholderTextColor={COLORS.primary.gray}
                editable={editable}
                placeholder={showLabel ? "" : placeholder}
                {...props}
            />
            <View
                style={[
                    styles.labelContainer,
                    {
                        top: -10,
                        opacity: showLabel ? 1 : 0
                    },
                    labelContainerStyle
                ]}
            >
                <Text
                    style={[
                        styles.label,
                        {
                            color: focus ? COLORS.primary.green : COLORS.primary.gray
                        },
                        labelStyle
                    ]}
                >
                    {label}
                </Text>
            </View>
            {right}
            {
                showList ? (
                    <View
                        style={styles.listContainer}
                    >
                        <ScrollView
                            style={styles.list}
                            contentContainerStyle={styles.contentContainer}
                            keyboardShouldPersistTaps='always'
                        >
                            {
                                listData.map((item, index) => (
                                    <Button
                                        key={item + index}
                                        text={item}
                                        style={styles.listItem}
                                        textStyle={styles.ListItemText}
                                        onPress={() => onSelect(item)}
                                        onStartShouldSetResponder={() => true}
                                    />
                                ))
                            }
                        </ScrollView>
                    </View>
                ) : null
            }
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderColor: '#B5B8B6',
        borderRadius: 12,
        backgroundColor: 'transparent',
        // backgroundColor: COLORS.primary.white,
        height: 44,
        position: 'relative',
        zIndex: 2
    },
    input: {
        flex: 1,
        height: 44,
        color: COLORS.primary.black,
        fontSize: 14,
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
        fontFamily: 'Montserrat-Regular'
    },
    focused: {
        borderColor: COLORS.primary.green
    },
    labelContainer: {
        position: 'absolute',
        left: 10,
        paddingHorizontal: 5,
        backgroundColor: COLORS.primary.white,
        height: 20
    },
    label: {
        color: COLORS.primary.black,
        marginBottom: 5,
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',
    },
    disabled: {
        color: COLORS.primary.gray,
    },
    listContainer: {
        position: 'absolute',
        width: '100%',
        top: 44,
        maxHeight: 200,
        elevation: 5,
        backgroundColor: COLORS.primary.white,
        borderRadius: 5,
        zIndex: 4
    },
    list: {
        width: '100%'
    },
    contentContainer: {
        // flexDirection: 'column-reverse'
        alignItems: 'center'
    },
    listItem: {
        backgroundColor: COLORS.primary.white,
        alignItems: 'flex-start'
    },
    ListItemText: {
        color: COLORS.primary.black,
        fontFamily: 'Montserrat-Regular'
    }
})