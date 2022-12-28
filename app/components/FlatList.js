import React from "react"
import {
    Dimensions,
    FlatList as List,
    StyleSheet,
    RefreshControl
} from 'react-native'

const { width } = Dimensions.get("window")

export const FlatList = ({
    data = [],
    loading = false,
    onRefresh = () => { },
    contentContainerStyle,
    ListEmptyComponent = null,
    ...props
}) => {
    return (
        <List
            data={data}
            contentContainerStyle={[
                data.length === 0 ? styles.emptyContainer : undefined,
                contentContainerStyle
            ]}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={onRefresh}
                />
            }
            ListEmptyComponent={!loading ? ListEmptyComponent : null}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
    }
})