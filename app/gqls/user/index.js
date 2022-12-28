import { gql } from "@apollo/client"

export const FIND_ME_USER = gql`
	{
		findMeUser{
			id
			createdAt
			updatedAt
			phone
			name
			code
			block
			delete
			addresses
			pushIds
			shipments {
				id
				createdAt
				updatedAt
				product{
					id
					createdAt
					updatedAt
					name
					description
					categories
					image
					restaurantId
					restaurant {
						id
						name
						minimumOrderAmount
						city
					}
					publish
					delete
					price
				}
				productId
				count
				delete
			}
		}
	}
`

export const SEND_USER_PHONE = gql`
	mutation(
		$data: UserSendPhoneInput!
	){
		sendUserPhone(
			data: $data
		)
	}
`

export const SEND_USER_CODE = gql`
	mutation(
		$data: UserSendPhoneAndCodeInput!
	){
		sendUserCode(
			data: $data
		){
			user {
				id
				createdAt
				updatedAt
				phone
				name
				code
				block
				delete
				addresses
				pushIds
				shipments {
					id
					createdAt
					updatedAt
					product{
						id
						createdAt
						updatedAt
						name
						description
						categories
						image
						restaurantId
						restaurant {
							id
							name
							minimumOrderAmount
							city
						}
						publish
						delete
						price
					}
					productId
					count
					delete
				}
			}
			token
		}
	}
`

export const FIND_UNIQUE_USER = gql`
	query(
		$where: UserWhereUniqueInput!
	){
		findUniqueUser(
			where: $where
		){
			id
			createdAt
			updatedAt
			phone
			name
			code
			block
			delete
			addresses
			pushIds
			shipments {
				id
				createdAt
				updatedAt
				product{
					id
					createdAt
					updatedAt
					name
					description
					categories
					image
					restaurantId
					restaurant {
						id
						name
						minimumOrderAmount
						city
					}
					publish
					delete
					price
				}
				productId
				count
				delete
			}
		}
	}
`
export const FIND_FIRST_USER = gql`
	query(
		$where: UserWhereInput
		$orderBy: [UserOrderByWithRelationInput]
		$cursor: UserWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [UserScalarFieldEnum]
	){
		findFirstUser(
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
			phone
			name
			code
			block
			delete
			addresses
			pushIds
			shipments {
				id
				createdAt
				updatedAt
				product{
					id
					createdAt
					updatedAt
					name
					description
					categories
					image
					restaurantId
					restaurant {
						id
						name
						minimumOrderAmount
						city
					}
					publish
					delete
					price
				}
				productId
				count
				delete
			}
		}
	}
`
export const FIND_MANY_USER = gql`
	query(
		$where: UserWhereInput
		$orderBy: [UserOrderByWithRelationInput]
		$cursor: UserWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [UserScalarFieldEnum]
	){
		findManyUser(
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
			phone
			name
			code
			block
			delete
			addresses
			pushIds
			shipments {
				id
				createdAt
				updatedAt
				product{
					id
					createdAt
					updatedAt
					name
					description
					categories
					image
					restaurantId
					restaurant {
						id
						name
						minimumOrderAmount
						city
					}
					publish
					delete
					price
				}
				productId
				count
				delete
			}
		}
	}
`
export const CREATE_ONE_USER = gql`
	mutation(
		$data: UserCreateInput!
	){
		createOneUser(
			data: $data
		){
			id
			createdAt
			updatedAt
			phone
			name
			code
			block
			delete
			addresses
		}
	}
`
export const UPDATE_ONE_USER = gql`
	mutation(
		$data: UserUpdateInput!
		$where: UserWhereUniqueInput!
	){
		updateOneUser(
			data: $data
			where: $where
		){
			id
			createdAt
			updatedAt
			phone
			name
			code
			block
			delete
			addresses
			pushIds
			shipments {
				id
				createdAt
				updatedAt
				product{
					id
					createdAt
					updatedAt
					name
					description
					categories
					image
					restaurantId
					restaurant {
						id
						name
						minimumOrderAmount
						city
					}
					publish
					delete
					price
				}
				productId
				count
				delete
			}
		}
	}
`
export const DELETE_ONE_USER = gql`
	mutation(
		$where: UserWhereUniqueInput!
	){
		deleteOneUser(
			where: $where
		){
			id
			createdAt
			updatedAt
			phone
			name
			code
			block
			delete
			addresses
			pushIds
			shipments {
				id
				createdAt
				updatedAt
				product{
					id
					createdAt
					updatedAt
					name
					description
					categories
					image
					restaurantId
					restaurant {
						id
						name
						minimumOrderAmount
						city
					}
					publish
					delete
					price
				}
				productId
				count
				delete
			}
		}
	}
`
export const UPSERT_ONE_USER = gql`
	mutation(
		$where: UserWhereUniqueInput!
		$create: UserCreateInput!
		$update: UserUpdateInput!
	){
		upsertOneUser(
			where: $where
			create: $create
			update: $update
		){
			id
			createdAt
			updatedAt
			phone
			name
			code
			block
			delete
			addresses
			pushIds
			shipments {
				id
				createdAt
				updatedAt
				product{
					id
					createdAt
					updatedAt
					name
					description
					categories
					image
					restaurantId
					restaurant {
						id
						name
						minimumOrderAmount
						city
					}
					publish
					delete
					price
				}
				productId
				count
				delete
			}
		}
	}
`

export const SEND_REQUEST = gql`
	mutation(
		$data: RequestInput!
	){
		sendRequest(data: $data)
	}
`