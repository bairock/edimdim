import { gql } from "@apollo/client"

export const CATEGORIES = gql`
    query($where: ProductWhereInput){
        findManyCategoryByProduct(where: $where)
    }
`
export const PRODUCT_BY_CATEGORIES = gql`
    query($where: ProductWhereInput){
        findManyProductGroupByCategory(where: $where)
    }
`

export const FIND_UNIQUE_PRODUCT = gql`
	query(
		$where: ProductWhereUniqueInput!
	){
		findUniqueProduct(
			where: $where
		){
			id
			createdAt
			updatedAt
			name
			description
			categories
			image
			restaurantId
			publish
			delete
			price
		}
	}
`
export const FIND_FIRST_PRODUCT = gql`
	query(
		$where: ProductWhereInput
		$orderBy: [ProductOrderByWithRelationInput]
		$cursor: ProductWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [ProductScalarFieldEnum]
	){
		findFirstProduct(
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
			description
			categories
			image
			restaurantId
			publish
			delete
			price
		}
	}
`
export const FIND_MANY_PRODUCT = gql`
	query(
		$where: ProductWhereInput
		$orderBy: [ProductOrderByWithRelationInput]
		$cursor: ProductWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [ProductScalarFieldEnum]
	){
		findManyProduct(
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
			description
			categories
			image
			restaurantId
			publish
			delete
			price
		}
	}
`
export const CREATE_ONE_PRODUCT = gql`
	mutation(
		$data: ProductCreateInput!
	){
		createOneProduct(
			data: $data
		){
			id
			createdAt
			updatedAt
			name
			description
			categories
			image
			restaurantId
			publish
			delete
			price
		}
	}
`
export const UPDATE_ONE_PRODUCT = gql`
	mutation(
		$data: ProductUpdateInput!
		$where: ProductWhereUniqueInput!
	){
		updateOneProduct(
			data: $data
			where: $where
		){
			id
			createdAt
			updatedAt
			name
			description
			categories
			image
			restaurantId
			publish
			delete
			price
		}
	}
`
export const DELETE_ONE_PRODUCT = gql`
	mutation(
		$where: ProductWhereUniqueInput!
	){
		deleteOneProduct(
			where: $where
		){
			id
			createdAt
			updatedAt
			name
			description
			categories
			image
			restaurantId
			publish
			delete
			price
		}
	}
`
export const UPSERT_ONE_PRODUCT = gql`
	mutation(
		$where: ProductWhereUniqueInput!
		$create: ProductCreateInput!
		$update: ProductUpdateInput!
	){
		upsertOneProduct(
			where: $where
			create: $create
			update: $update
		){
			id
			createdAt
			updatedAt
			name
			description
			categories
			image
			restaurantId
			publish
			delete
			price
		}
	}
`