import { gql } from "@apollo/client"

export const DELETE_MANY_USER = gql`
	mutation(
		$where: UserWhereInput
	){
		deleteManyUser(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_USER = gql`
	mutation(
		$data: UserUpdateManyMutationInput!
		$where: UserWhereInput
	){
		updateManyUser(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_SHIPMENT = gql`
	mutation(
		$where: ShipmentWhereInput
	){
		deleteManyShipment(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_SHIPMENT = gql`
	mutation(
		$data: ShipmentUpdateManyMutationInput!
		$where: ShipmentWhereInput
	){
		updateManyShipment(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_ADMIN = gql`
	mutation(
		$where: AdminWhereInput
	){
		deleteManyAdmin(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_ADMIN = gql`
	mutation(
		$data: AdminUpdateManyMutationInput!
		$where: AdminWhereInput
	){
		updateManyAdmin(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_RESTAURANT = gql`
	mutation(
		$where: RestaurantWhereInput
	){
		deleteManyRestaurant(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_RESTAURANT = gql`
	mutation(
		$data: RestaurantUpdateManyMutationInput!
		$where: RestaurantWhereInput
	){
		updateManyRestaurant(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_ADDRESS = gql`
	mutation(
		$where: AddressWhereInput
	){
		deleteManyAddress(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_ADDRESS = gql`
	mutation(
		$data: AddressUpdateManyMutationInput!
		$where: AddressWhereInput
	){
		updateManyAddress(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_PRODUCT = gql`
	mutation(
		$where: ProductWhereInput
	){
		deleteManyProduct(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_PRODUCT = gql`
	mutation(
		$data: ProductUpdateManyMutationInput!
		$where: ProductWhereInput
	){
		updateManyProduct(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_STOCK = gql`
	mutation(
		$where: StockWhereInput
	){
		deleteManyStock(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_STOCK = gql`
	mutation(
		$data: StockUpdateManyMutationInput!
		$where: StockWhereInput
	){
		updateManyStock(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_REVIEW = gql`
	mutation(
		$where: ReviewWhereInput
	){
		deleteManyReview(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_REVIEW = gql`
	mutation(
		$data: ReviewUpdateManyMutationInput!
		$where: ReviewWhereInput
	){
		updateManyReview(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_ORDER = gql`
	mutation(
		$where: OrderWhereInput
	){
		deleteManyOrder(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_ORDER = gql`
	mutation(
		$data: OrderUpdateManyMutationInput!
		$where: OrderWhereInput
	){
		updateManyOrder(
			data: $data
			where: $where
		){
			count
		}
	}
`