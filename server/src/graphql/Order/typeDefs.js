const { default: gql } = require('graphql-tag')

const Order = gql`
  scalar Json
  scalar Decimal

  input OrderPayWhereUniqueInput {
    uuid: String!
  }

  input CustomOrderCreateInput {
    deliveryMethod: String!
    paymentMethod: String!
    name: String!
    address: String!
    phone: String!
    comment: String
  }

  type CreateOneOrderPayload {
    order: Order!
    payment: String!
  }

  type Order {
    id: String!
    uuid: String!
    pid: String
    createdAt: DateTime!
    updatedAt: DateTime!
    shipments: [Json!]!
    amount: Decimal!
    paymentStatus: String!
    orderStatus: String!
    deliveryMethod: String!
    paymentMethod: String!
    name: String!
    address: String!
    phone: String!
    user: User!
    userId: String!
    restaurant: Restaurant!
    restaurantId: String!
    comment: String
    review: Review
  }

  type Query {
    findPayOrder(where: OrderPayWhereUniqueInput!): String!
    findUniqueOrder(where: OrderWhereUniqueInput!): Order
    findFirstOrder(
      where: OrderWhereInput
      orderBy: [OrderOrderByWithRelationInput]
      cursor: OrderWhereUniqueInput
      take: Int
      skip: Int
      distinct: [OrderScalarFieldEnum]
    ): Order
    findManyOrder(
      where: OrderWhereInput
      orderBy: [OrderOrderByWithRelationInput]
      cursor: OrderWhereUniqueInput
      take: Int
      skip: Int
      distinct: [OrderScalarFieldEnum]
    ): [Order!]
    findManyOrderCount(
      where: OrderWhereInput
      orderBy: [OrderOrderByWithRelationInput]
      cursor: OrderWhereUniqueInput
      take: Int
      skip: Int
      distinct: [OrderScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOneOrder(data: CustomOrderCreateInput!): CreateOneOrderPayload!
    updateOneOrder(
      data: OrderUpdateInput!
      where: OrderWhereUniqueInput!
    ): Order!
    deleteOneOrder(where: OrderWhereUniqueInput!): Order
    upsertOneOrder(
      where: OrderWhereUniqueInput!
      create: OrderCreateInput!
      update: OrderUpdateInput!
    ): Order
    deleteManyOrder(where: OrderWhereInput): BatchPayload
    updateManyOrder(
      data: OrderUpdateManyMutationInput!
      where: OrderWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Order,
}
