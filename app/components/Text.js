import React from 'react'
import RN from 'react-native'

import { COLORS } from '../utils/const'

export const Text = ({ children, style, ...props }) => {
    return <RN.Text style={[styles.text, style]} {...props}>{children}</RN.Text>
}

const styles = RN.StyleSheet.create({
    text: {
        fontFamily: 'Montserrat-Regular',
        color: COLORS.primary.black,
    }
})