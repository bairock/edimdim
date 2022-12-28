import { gql } from "@apollo/client"

export const FIND_UNIQUE_SHIPMENT = gql`
	query(
		$where: ShipmentWhereUniqueInput!
	){
		findUniqueShipment(
			where: $where
		){
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
					addresses{
						id
						createdAt
						updatedAt
						value
						phones
						startWorkAt
						endWorkAt
						restaurantId
						publish
						delete
						allTime
					}
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
`
export const FIND_FIRST_SHIPMENT = gql`
	query(
		$where: ShipmentWhereInput
		$orderBy: [ShipmentOrderByWithRelationInput]
		$cursor: ShipmentWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [ShipmentScalarFieldEnum]
	){
		findFirstShipment(
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
					addresses{
						id
						createdAt
						updatedAt
						value
						phones
						startWorkAt
						endWorkAt
						restaurantId
						publish
						delete
						allTime
					}
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
`
export const FIND_MANY_SHIPMENT = gql`
	query(
		$where: ShipmentWhereInput
		$orderBy: [ShipmentOrderByWithRelationInput]
		$cursor: ShipmentWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [ShipmentScalarFieldEnum]
	){
		findManyShipment(
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
					addresses{
						id
						createdAt
						updatedAt
						value
						phones
						startWorkAt
						endWorkAt
						restaurantId
						publish
						delete
						allTime
					}
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
`
export const CREATE_ONE_SHIPMENT = gql`
	mutation(
		$data: ShipmentCreateInput!
	){
		createOneShipment(
			data: $data
		){
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
					addresses{
						id
						createdAt
						updatedAt
						value
						phones
						startWorkAt
						endWorkAt
						restaurantId
						publish
						delete
						allTime
					}
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
`
export const UPDATE_ONE_SHIPMENT = gql`
	mutation(
		$data: ShipmentUpdateInput!
		$where: ShipmentWhereUniqueInput!
	){
		updateOneShipment(
			data: $data
			where: $where
		){
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
					addresses{
						id
						createdAt
						updatedAt
						value
						phones
						startWorkAt
						endWorkAt
						restaurantId
						publish
						delete
						allTime
					}
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
`
export const DELETE_ONE_SHIPMENT = gql`
	mutation(
		$where: ShipmentWhereUniqueInput!
	){
		deleteOneShipment(
			where: $where
		){
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
					addresses{
						id
						createdAt
						updatedAt
						value
						phones
						startWorkAt
						endWorkAt
						restaurantId
						publish
						delete
						allTime
					}
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
`
export const UPSERT_ONE_SHIPMENT = gql`
	mutation(
		$where: ShipmentWhereUniqueInput!
		$create: ShipmentCreateInput!
		$update: ShipmentUpdateInput!
	){
		upsertOneShipment(
			where: $where
			create: $create
			update: $update
		){
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
				}
				restaurant {
					id
					name
					minimumOrderAmount
					city
					addresses{
						id
						createdAt
						updatedAt
						value
						phones
						startWorkAt
						endWorkAt
						restaurantId
						publish
						delete
						allTime
					}
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
`