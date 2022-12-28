import { gql } from "@apollo/client"

export const FIND_UNIQUE_ADDRESS = gql`
	query(
		$where: AddressWhereUniqueInput!
	){
		findUniqueAddress(
			where: $where
		){
			id
			createdAt
			updatedAt
			value
			phones
			startWorkAt
			endWorkAt
			publish
			allTime
			delete
		}
	}
`
export const FIND_FIRST_ADDRESS = gql`
	query(
		$where: AddressWhereInput
		$orderBy: [AddressOrderByWithRelationInput]
		$cursor: AddressWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [AddressScalarFieldEnum]
	){
		findFirstAddress(
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
			phones
			startWorkAt
			endWorkAt
			publish
			allTime
			delete
		}
	}
`
export const FIND_MANY_ADDRESS = gql`
	query(
		$where: AddressWhereInput
		$orderBy: [AddressOrderByWithRelationInput]
		$cursor: AddressWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [AddressScalarFieldEnum]
	){
		findManyAddress(
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
			phones
			startWorkAt
			endWorkAt
			publish
			allTime
			delete
		}
	}
`
export const CREATE_ONE_ADDRESS = gql`
	mutation(
		$data: AddressCreateInput!
	){
		createOneAddress(
			data: $data
		){
			id
			createdAt
			updatedAt
			value
			phones
			startWorkAt
			endWorkAt
			publish
			allTime
			delete
		}
	}
`
export const UPDATE_ONE_ADDRESS = gql`
	mutation(
		$data: AddressUpdateInput!
		$where: AddressWhereUniqueInput!
	){
		updateOneAddress(
			data: $data
			where: $where
		){
			id
			createdAt
			updatedAt
			value
			phones
			startWorkAt
			endWorkAt
			publish
			allTime
			delete
		}
	}
`
export const DELETE_ONE_ADDRESS = gql`
	mutation(
		$where: AddressWhereUniqueInput!
	){
		deleteOneAddress(
			where: $where
		){
			id
			createdAt
			updatedAt
			value
			phones
			startWorkAt
			endWorkAt
			publish
			allTime
			delete
		}
	}
`
export const UPSERT_ONE_ADDRESS = gql`
	mutation(
		$where: AddressWhereUniqueInput!
		$create: AddressCreateInput!
		$update: AddressUpdateInput!
	){
		upsertOneAddress(
			where: $where
			create: $create
			update: $update
		){
			id
			createdAt
			updatedAt
			value
			phones
			startWorkAt
			endWorkAt
			publish
			allTime
			delete
		}
	}
`