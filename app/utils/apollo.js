import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    from
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'
import AsyncStorage from '@react-native-community/async-storage'

import { url } from './endpoints'

const uri = `${url}/graphql`

const httpLink = createHttpLink({ uri })

const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? token : ''
        }
    }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(async ({ message, locations, path }) => {
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        })
    }
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

const uploadLink = createUploadLink({
    uri,
    credentials: 'same-origin'
})

const link = from([errorLink, authLink, httpLink, uploadLink])

const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
        dataIdFromObject: object => object.id || null,
        addTypename: false
    })
})

export default client
