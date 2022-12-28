import React, { createContext, useContext, useReducer, useEffect } from 'react'
// import AsyncStorage from '@react-native-community/async-storage'

import { cart } from './states'
import { reducer as functions } from './reducer'

import { useUser } from '../utils/hooks'
import AsyncStorage from '@react-native-community/async-storage'

export const StateContext = createContext()

export default StateProvider = (props) => {
    const reducer = useReducer(functions, cart)
    const [_, dispatch] = reducer
    useUser({
        onCompleted: async ({ findMeUser: user }) => {
            if (user) {
                const { shipments, addresses } = user
                const address = addresses.length > 0 ? addresses[0] : null
                dispatch({
                    type: 'setAddress',
                    data: address
                })
                dispatch({
                    type: 'setCart',
                    data: shipments.map(item => ({
                        id: item.id,
                        product: item.product.id,
                        count: item.count,
                        restaurant: item.product.restaurant.id
                    }))
                })
            } else {
                const data = await AsyncStorage.getItem("cart")
                if (data) {
                    const carts = JSON.parse(data)
                    dispatch({
                        type: 'setCart',
                        data: carts.filter(item => item)
                    })
                }
            }
        }
    })

    const value = {
        reducer
    }

    return <StateContext.Provider value={value}>{props.children}</StateContext.Provider>
}

export const useStateValue = () => useContext(StateContext)