import { gql } from "@apollo/client"

export const FIND_PAY_ORDER = gql`
	query($where: OrderPayWhereUniqueInput!) {
		findPayOrder(where: $where)
	}
`

export const FIND_UNIQUE_ORDER = gql`
	query(
		$where: OrderWhereUniqueInput!
	){
		findUniqueOrder(
			where: $where
		){
			id
			uuid
			createdAt
			updatedAt
			shipments
			amount
			paymentStatus
			orderStatus
			deliveryMethod
			paymentMethod
			name
			address
			phone
			restaurant{
				id
				createdAt
				updatedAt
				name
				logo
				image
				description
				categories
				minimumOrderAmount
				deliveryCondition
				legalInformation
				city
				payoff
				publish
				delete
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
			}
			restaurantId
		}
	}
`
export const FIND_FIRST_ORDER = gql`
	query(
		$where: OrderWhereInput
		$orderBy: [OrderOrderByWithRelationInput]
		$cursor: OrderWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [OrderScalarFieldEnum]
	){
		findFirstOrder(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		){
			id
			uuid
			createdAt
			updatedAt
			shipments
			amount
			paymentStatus
			orderStatus
			deliveryMethod
			paymentMethod
			name
			address
			phone
			comment
			restaurant{
				id
				createdAt
				updatedAt
				name
				logo
				image
				description
				categories
				minimumOrderAmount
				deliveryCondition
				legalInformation
				city
				payoff
				publish
				delete
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
			}
			restaurantId
		}
	}
`
export const FIND_MANY_ORDER = gql`
	query(
		$where: OrderWhereInput
		$orderBy: [OrderOrderByWithRelationInput]
		$cursor: OrderWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [OrderScalarFieldEnum]
	){
		findManyOrder(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		){
			id
			uuid
			createdAt
			updatedAt
			shipments
			amount
			paymentStatus
			orderStatus
			deliveryMethod
			paymentMethod
			name
			address
			phone
			comment
			restaurant{
				id
				createdAt
				updatedAt
				name
				logo
				image
				description
				categories
				minimumOrderAmount
				deliveryCondition
				legalInformation
				city
				payoff
				publish
				delete
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
			}
			restaurantId
		}
	}
`
export const CREATE_ONE_ORDER = gql`
	mutation(
		$data: CustomOrderCreateInput!
	){
		createOneOrder(
			data: $data
		){
			payment
			order {
				id
				uuid
				createdAt
				updatedAt
				shipments
				amount
				paymentStatus
				orderStatus
				deliveryMethod
				paymentMethod
				name
				address
				phone
				comment
				restaurant{
					id
					createdAt
					updatedAt
					name
					logo
					image
					description
					categories
					minimumOrderAmount
					deliveryCondition
					legalInformation
					city
					payoff
					publish
					delete
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
				}
				restaurantId
			}
		}
	}
`
export const UPDATE_ONE_ORDER = gql`
	mutation(
		$data: OrderUpdateInput!
		$where: OrderWhereUniqueInput!
	){
		updateOneOrder(
			data: $data
			where: $where
		){
			id
			uuid
			createdAt
			updatedAt
			shipments
			amount
			paymentStatus
			orderStatus
			deliveryMethod
			paymentMethod
			name
			address
			phone
			comment
			restaurant{
				id
				createdAt
				updatedAt
				name
				logo
				image
				description
				categories
				minimumOrderAmount
				deliveryCondition
				legalInformation
				city
				payoff
				publish
				delete
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
			}
			restaurantId
		}
	}
`
export const DELETE_ONE_ORDER = gql`
	mutation(
		$where: OrderWhereUniqueInput!
	){
		deleteOneOrder(
			where: $where
		){
			id
			uuid
			createdAt
			updatedAt
			shipments
			amount
			paymentStatus
			orderStatus
			deliveryMethod
			paymentMethod
			name
			address
			phone
			comment
			restaurant{
				id
				createdAt
				updatedAt
				name
				logo
				image
				description
				categories
				minimumOrderAmount
				deliveryCondition
				legalInformation
				city
				payoff
				publish
				delete
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
			}
			restaurantId
		}
	}
`
export const UPSERT_ONE_ORDER = gql`
	mutation(
		$where: OrderWhereUniqueInput!
		$create: OrderCreateInput!
		$update: OrderUpdateInput!
	){
		upsertOneOrder(
			where: $where
			create: $create
			update: $update
		){
			id
			uuid
			createdAt
			updatedAt
			shipments
			amount
			paymentStatus
			orderStatus
			deliveryMethod
			paymentMethod
			name
			address
			phone
			comment
			restaurant{
				id
				createdAt
				updatedAt
				name
				logo
				image
				description
				categories
				minimumOrderAmount
				deliveryCondition
				legalInformation
				city
				payoff
				publish
				delete
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
			}
			restaurantId
		}
	}
`