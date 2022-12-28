import React, { useCallback, useEffect } from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    Keyboard
} from 'react-native'
import { COLORS } from '../utils/const'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    useAnimatedGestureHandler,
    withSpring,
    runOnJS
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('screen')

export const Animatedscreen = ({
    children,
    offset = height / 3,
    onBottomLimit = () => { },
    closeOffset = height / 2,
    style
}) => {

    const anim = useSharedValue(height)

    useEffect(() => {
        anim.value = withTiming(offset, { duration: 400 })
        const showSubscription = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        const hideSubscription = Keyboard.addListener('keyboardDidHide', keyboardDidHide)
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        }
    }, [])

    const keyboardDidShow = useCallback(() => {
        console.log("show")
        anim.value = withTiming(15, { duration: 400 })
    }, [anim])

    const keyboardDidHide = useCallback(() => {
        anim.value = withTiming(offset, { duration: 400 })
    }, [anim])

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: anim.value }],
    }))

    const eventHandler = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.startY = anim.value
        },
        onActive: (event, context) => {
            anim.value = context.startY + event.translationY
        },
        onEnd: (event, context) => {
            const position = context.startY + event.translationY
            if (position < height / 6) {
                anim.value = withSpring(15, { damping: 15 })
            }
            if (position > closeOffset) {
                runOnJS(onBottomLimit)()
            }
        },
    })

    return (
        <PanGestureHandler onGestureEvent={eventHandler}>
            <Animated.View
                style={[
                    styles.container,
                    animatedStyle,
                    style
                ]}
            >
                <View
                    style={styles.drag}
                >
                    <View style={styles.indicator} />
                </View>
                {children}
            </Animated.View>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        backgroundColor: COLORS.primary.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    drag: {
        height: 40,
        width,
        alignItems: 'center',
        paddingTop: 8,
        backgroundColor: 'transparent'
    },
    indicator: {
        width: "12%",
        height: 4,
        backgroundColor: COLORS.secondary.gray,
        borderRadius: 4
    }
})