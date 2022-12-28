import { gql } from "@apollo/client"

export const FIND_UNIQUE_REVIEW = gql`
	query(
		$where: ReviewWhereUniqueInput!
	){
		findUniqueReview(
			where: $where
		){
			id
			createdAt
			updatedAt
			value
			description
			user{
				id
				createdAt
				updatedAt
				phone
				name
				code
				block
				delete
			}
			userId
			restaurant{
				id
				createdAt
				updatedAt
				name
				logo
				image
				description
				categories
				city
				publish
				delete
			}
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
			}
			restaurantId
			block
			delete
		}
	}
`
export const FIND_FIRST_REVIEW = gql`
	query(
		$where: ReviewWhereInput
		$orderBy: [ReviewOrderByWithRelationInput]
		$cursor: ReviewWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [ReviewScalarFieldEnum]
	){
		findFirstReview(
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
			value
			description
			user{
				id
				createdAt
				updatedAt
				phone
				name
				code
				block
				delete
			}
			userId
			restaurant{
				id
				createdAt
				updatedAt
				name
				logo
				image
				description
				categories
				city
				publish
				delete
			}
			restaurantId
			block
			delete
		}
	}
`
export const FIND_MANY_REVIEW = gql`
	query(
		$where: ReviewWhereInput
		$orderBy: [ReviewOrderByWithRelationInput]
		$cursor: ReviewWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [ReviewScalarFieldEnum]
	){
		findManyReview(
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
			value
			description
			user{
				id
				createdAt
				updatedAt
				phone
				name
				code
				block
				delete
			}
			userId
			restaurant{
				id
				createdAt
				updatedAt
				name
				logo
				image
				description
				categories
				city
				publish
				delete
			}
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
			}
			restaurantId
			block
			delete
		}
	}
`
export const CREATE_ONE_REVIEW = gql`
	mutation(
		$data: ReviewCreateInput!
	){
		createOneReview(
			data: $data
		){
			id
			createdAt
			updatedAt
			value
			description
			user{
				id
				createdAt
				updatedAt
				phone
				name
				code
				block
				delete
			}
			userId
			restaurant{
				id
				createdAt
				updatedAt
				name
				logo
				image
				description
				categories
				city
				publish
				delete
			}
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
			}
			restaurantId
			block
			delete
		}
	}
`
export const UPDATE_ONE_REVIEW = gql`
	mutation(
		$data: ReviewUpdateInput!
		$where: ReviewWhereUniqueInput!
	){
		updateOneReview(
			data: $data
			where: $where
		){
			id
			createdAt
			updatedAt
			value
			description
			user{
				id
				createdAt
				updatedAt
				phone
				name
				code
				block
				delete
			}
			userId
			restaurant{
				id
				createdAt
				updatedAt
				name
				logo
				image
				description
				categories
				city
				publish
				delete
			}
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
			}
			restaurantId
			block
			delete
		}
	}
`
export const DELETE_ONE_REVIEW = gql`
	mutation(
		$where: ReviewWhereUniqueInput!
	){
		deleteOneReview(
			where: $where
		){
			id
			createdAt
			updatedAt
			value
			description
			user{
				id
				createdAt
				updatedAt
				phone
				name
				code
				block
				delete
			}
			userId
			restaurant{
				id
				createdAt
				updatedAt
				name
				logo
				image
				description
				categories
				city
				publish
				delete
			}
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
			}
			restaurantId
			block
			delete
		}
	}
`
export const UPSERT_ONE_REVIEW = gql`
	mutation(
		$where: ReviewWhereUniqueInput!
		$create: ReviewCreateInput!
		$update: ReviewUpdateInput!
	){
		upsertOneReview(
			where: $where
			create: $create
			update: $update
		){
			id
			createdAt
			updatedAt
			value
			description
			user{
				id
				createdAt
				updatedAt
				phone
				name
				code
				block
				delete
			}
			userId
			restaurant{
				id
				createdAt
				updatedAt
				name
				logo
				image
				description
				categories
				city
				publish
				delete
			}
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
			}
			restaurantId
			block
			delete
		}
	}
`