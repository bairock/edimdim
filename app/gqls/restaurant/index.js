import { gql } from "@apollo/client"

export const FIND_UNIQUE_RESTAURANT = gql`
	query(
		$where: RestaurantWhereUniqueInput!
		$stocksWhere: StockWhereInput
		$stocksOrderBy: StockOrderByWithRelationInput
	){
		findUniqueRestaurant(
			where: $where
		){
			id
			createdAt
			updatedAt
			name
			logo
			average
			image
			description
			addresses{
				id
				createdAt
				updatedAt
				value
				allTime
				phones
				startWorkAt
				endWorkAt
				restaurantId
				publish
				delete
			}
			stocks(where: $stocksWhere orderBy: $stocksOrderBy){
				id
				createdAt
				updatedAt
				endAt
				name
				description
				restaurantId
				publish
				delete
				image
			}
			categories
			city
			minimumOrderAmount
			productsCategoriers
			deliveryCondition
			legalInformation
			payoff
			publish
			delete
		}
	}
`
export const FIND_FIRST_RESTAURANT = gql`
	query(
		$where: RestaurantWhereInput
		$orderBy: [RestaurantOrderByWithRelationInput]
		$cursor: RestaurantWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [RestaurantScalarFieldEnum]
		$stocksWhere: StockWhereInput
		$stocksOrderBy: StockOrderByWithRelationInput
	){
		findFirstRestaurant(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		){
			id
			createdAt
			updatedAt
			name
			logo
			average
			image
			description
			addresses{
				id
				createdAt
				updatedAt
				value
				allTime
				phones
				startWorkAt
				endWorkAt
				restaurantId
				publish
				delete
			}
			stocks(where: $stocksWhere orderBy: $stocksOrderBy){
				id
				createdAt
				updatedAt
				endAt
				name
				description
				restaurantId
				publish
				delete
				image
			}
			categories
			city
			minimumOrderAmount
			productsCategoriers
			deliveryCondition
			legalInformation
			payoff
			publish
			delete
		}
	}
`
export const FIND_MANY_RESTAURANT = gql`
	query(
		$where: RestaurantWhereInput
		$orderBy: [RestaurantOrderByWithRelationInput]
		$cursor: RestaurantWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [RestaurantScalarFieldEnum]
		$stocksWhere: StockWhereInput
		$stocksOrderBy: StockOrderByWithRelationInput
	){
		findManyRestaurant(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		){
			id
			createdAt
			updatedAt
			name
			logo
			average
			image
			description
			addresses{
				id
				createdAt
				updatedAt
				value
				allTime
				phones
				startWorkAt
				endWorkAt
				restaurantId
				publish
				delete
			}
			stocks(where: $stocksWhere orderBy: $stocksOrderBy){
				id
				createdAt
				updatedAt
				endAt
				name
				description
				restaurantId
				publish
				delete
				image
			}
			categories
			city
			minimumOrderAmount
			productsCategoriers
			deliveryCondition
			legalInformation
			payoff
			publish
			delete
		}
	}
`
export const CREATE_ONE_RESTAURANT = gql`
	mutation(
		$data: RestaurantCreateInput!
	){
		createOneRestaurant(
			data: $data
		){
			id
			createdAt
			updatedAt
			name
			logo
			average
			image
			description
			addresses{
				id
				createdAt
				updatedAt
				value
				allTime
				phones
				startWorkAt
				endWorkAt
				restaurantId
				publish
				delete
			}
			stocks{
				id
				createdAt
				updatedAt
				endAt
				name
				description
				restaurantId
				publish
				delete
				image
			}
			categories
			city
			minimumOrderAmount
			productsCategoriers
			deliveryCondition
			legalInformation
			payoff
			publish
			delete
		}
	}
`
export const UPDATE_ONE_RESTAURANT = gql`
	mutation(
		$data: RestaurantUpdateInput!
		$where: RestaurantWhereUniqueInput!
	){
		updateOneRestaurant(
			data: $data
			where: $where
		){
			id
			createdAt
			updatedAt
			name
			logo
			average
			image
			description
			addresses{
				id
				createdAt
				updatedAt
				value
				allTime
				phones
				startWorkAt
				endWorkAt
				restaurantId
				publish
				delete
			}
			stocks{
				id
				createdAt
				updatedAt
				endAt
				name
				description
				restaurantId
				publish
				delete
				image
			}
			categories
			city
			minimumOrderAmount
			productsCategoriers
			deliveryCondition
			legalInformation
			payoff
			publish
			delete
		}
	}
`
export const DELETE_ONE_RESTAURANT = gql`
	mutation(
		$where: RestaurantWhereUniqueInput!
	){
		deleteOneRestaurant(
			where: $where
		){
			id
			createdAt
			updatedAt
			name
			logo
			average
			image
			description
			addresses{
				id
				createdAt
				updatedAt
				value
				allTime
				phones
				startWorkAt
				endWorkAt
				restaurantId
				publish
				delete
			}
			stocks{
				id
				createdAt
				updatedAt
				endAt
				name
				description
				restaurantId
				publish
				delete
				image
			}
			categories
			city
			minimumOrderAmount
			productsCategoriers
			deliveryCondition
			legalInformation
			payoff
			publish
			delete
		}
	}
`
export const UPSERT_ONE_RESTAURANT = gql`
	mutation(
		$where: RestaurantWhereUniqueInput!
		$create: RestaurantCreateInput!
		$update: RestaurantUpdateInput!
	){
		upsertOneRestaurant(
			where: $where
			create: $create
			update: $update
		){
			id
			createdAt
			updatedAt
			name
			logo
			average
			image
			description
			addresses{
				id
				createdAt
				updatedAt
				value
				allTime
				phones
				startWorkAt
				endWorkAt
				restaurantId
				publish
				delete
			}
			stocks{
				id
				createdAt
				updatedAt
				endAt
				name
				description
				restaurantId
				publish
				delete
				image
			}
			categories
			city
			minimumOrderAmount
			productsCategoriers
			deliveryCondition
			legalInformation
			payoff
			publish
			delete
		}
	}
`