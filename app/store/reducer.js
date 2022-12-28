import AsyncStorage from '@react-native-community/async-storage'

const setCart = async (data) => {
    await AsyncStorage.setItem('cart', JSON.stringify(data))
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'setAddress': {
            return {
                ...state,
                address: action.data
            }
        }
        case 'setCart': {
            setCart([])
            return {
                ...state,
                products: action.data
            }
        }
        case 'addToCart': {
            const products = [action.data, ...state.products]
            setCart(products)
            return {
                ...state,
                products
            }
        }
        case 'removeFromCart': {
            const products = state.products.filter((data) => data.id !== action.data)
            setCart(products)
            return {
                ...state,
                products
            }
        }
        case 'increaseCount': {
            let product = state.products.find((data) => data.id === action.data)
            if (product) {
                const newProduct = {
                    ...product,
                    count: product.count + 1
                }
                const newProducts = state.products.map((data) =>
                    action.data === data.id ? newProduct : data
                )
                setCart(newProducts)
                return {
                    ...state,
                    products: newProducts
                }
            } else {
                return state
            }
        }
        case 'subtractCount': {
            const product = state.products.find((data) => data.id === action.data)
            if (product) {
                const newProduct = {
                    ...product,
                    count: product.count > 1 ? product.count - 1 : product.count
                }
                const newProducts = state.products.map((data) =>
                    action.data === data.id ? newProduct : data
                )
                setCart(newProducts)
                return {
                    ...state,
                    products: newProducts
                }
            } else {
                return state
            }
        }
        case 'updateData': {
            const newProducts = state.products.map(item => {
                if (item.product === action.data.product) {
                    return action.data
                }
                return item
            })
            setCart(newProducts)
            return {
                ...state,
                products: newProducts
            }
        }
        case 'setPosition': {
            return {
                ...state,
                position: action.data
            }
        }
        default:
            return state
    }
}