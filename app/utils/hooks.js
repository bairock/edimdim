import { useQuery } from '@apollo/client'
import { FIND_ME_USER } from '../gqls'

export const useUser = (params = {}) => {
    const { onCompleted = () => { }, onError = () => { }, fetchPolicy = undefined } = params

    const { data, loading, error, refetch } = useQuery(FIND_ME_USER, {
        onCompleted,
        onError,
        fetchPolicy
    })

    const user = data ? data.findMeUser : null

    return {
        loading,
        error,
        user,
        refetch
    }
}