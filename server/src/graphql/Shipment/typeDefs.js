const { default: gql } = require('graphql-tag')

const Shipment = gql`
  type Shipment {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    product: Product!
    productId: String!
    user: User
    userId: String
    count: Int!
    delete: Boolean!
  }

  type Query {
    findUniqueShipment(where: ShipmentWhereUniqueInput!): Shipment
    findFirstShipment(
      where: ShipmentWhereInput
      orderBy: [ShipmentOrderByWithRelationInput]
      cursor: ShipmentWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ShipmentScalarFieldEnum]
    ): Shipment
    findManyShipment(
      where: ShipmentWhereInput
      orderBy: [ShipmentOrderByWithRelationInput]
      cursor: ShipmentWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ShipmentScalarFieldEnum]
    ): [Shipment!]
    findManyShipmentCount(
      where: ShipmentWhereInput
      orderBy: [ShipmentOrderByWithRelationInput]
      cursor: ShipmentWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ShipmentScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOneShipment(data: ShipmentCreateInput!): Shipment!
    updateOneShipment(
      data: ShipmentUpdateInput!
      where: ShipmentWhereUniqueInput!
    ): Shipment!
    deleteOneShipment(where: ShipmentWhereUniqueInput!): Shipment
    upsertOneShipment(
      where: ShipmentWhereUniqueInput!
      create: ShipmentCreateInput!
      update: ShipmentUpdateInput!
    ): Shipment
    deleteManyShipment(where: ShipmentWhereInput): BatchPayload
    updateManyShipment(
      data: ShipmentUpdateManyMutationInput!
      where: ShipmentWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Shipment,
}
