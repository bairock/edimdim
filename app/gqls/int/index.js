import { gql } from "@apollo/client"

export const FIND_MANY_USER_COUNT = gql`
	query(
		$where: UserWhereInput
		$orderBy: [UserOrderByWithRelationInput]
		$cursor: UserWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [UserScalarFieldEnum]
	){
		findManyUserCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_SHIPMENT_COUNT = gql`
	query(
		$where: ShipmentWhereInput
		$orderBy: [ShipmentOrderByWithRelationInput]
		$cursor: ShipmentWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [ShipmentScalarFieldEnum]
	){
		findManyShipmentCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_ADMIN_COUNT = gql`
	query(
		$where: AdminWhereInput
		$orderBy: [AdminOrderByWithRelationInput]
		$cursor: AdminWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [AdminScalarFieldEnum]
	){
		findManyAdminCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_RESTAURANT_COUNT = gql`
	query(
		$where: RestaurantWhereInput
		$orderBy: [RestaurantOrderByWithRelationInput]
		$cursor: RestaurantWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [RestaurantScalarFieldEnum]
	){
		findManyRestaurantCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_ADDRESS_COUNT = gql`
	query(
		$where: AddressWhereInput
		$orderBy: [AddressOrderByWithRelationInput]
		$cursor: AddressWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [AddressScalarFieldEnum]
	){
		findManyAddressCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_PRODUCT_COUNT = gql`
	query(
		$where: ProductWhereInput
		$orderBy: [ProductOrderByWithRelationInput]
		$cursor: ProductWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [ProductScalarFieldEnum]
	){
		findManyProductCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_STOCK_COUNT = gql`
	query(
		$where: StockWhereInput
		$orderBy: [StockOrderByWithRelationInput]
		$cursor: StockWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [StockScalarFieldEnum]
	){
		findManyStockCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_REVIEW_COUNT = gql`
	query(
		$where: ReviewWhereInput
		$orderBy: [ReviewOrderByWithRelationInput]
		$cursor: ReviewWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [ReviewScalarFieldEnum]
	){
		findManyReviewCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_ORDER_COUNT = gql`
	query(
		$where: OrderWhereInput
		$orderBy: [OrderOrderByWithRelationInput]
		$cursor: OrderWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [OrderScalarFieldEnum]
	){
		findManyOrderCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`