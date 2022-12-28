const { default: gql } = require('graphql-tag')

const Address = gql`
  type Address {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    value: String!
    phones: [String!]!
    startWorkAt: DateTime
    endWorkAt: DateTime
    restaurant: Restaurant!
    restaurantId: String!
    publish: Boolean!
    delete: Boolean!
    geoPoint: Json
    allTime: Boolean!
  }

  type Query {
    findUniqueAddress(where: AddressWhereUniqueInput!): Address
    findFirstAddress(
      where: AddressWhereInput
      orderBy: [AddressOrderByWithRelationInput]
      cursor: AddressWhereUniqueInput
      take: Int
      skip: Int
      distinct: [AddressScalarFieldEnum]
    ): Address
    findManyAddress(
      where: AddressWhereInput
      orderBy: [AddressOrderByWithRelationInput]
      cursor: AddressWhereUniqueInput
      take: Int
      skip: Int
      distinct: [AddressScalarFieldEnum]
    ): [Address!]
    findManyAddressCount(
      where: AddressWhereInput
      orderBy: [AddressOrderByWithRelationInput]
      cursor: AddressWhereUniqueInput
      take: Int
      skip: Int
      distinct: [AddressScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOneAddress(data: AddressCreateInput!): Address!
    updateOneAddress(
      data: AddressUpdateInput!
      where: AddressWhereUniqueInput!
    ): Address!
    deleteOneAddress(where: AddressWhereUniqueInput!): Address
    upsertOneAddress(
      where: AddressWhereUniqueInput!
      create: AddressCreateInput!
      update: AddressUpdateInput!
    ): Address
    deleteManyAddress(where: AddressWhereInput): BatchPayload
    updateManyAddress(
      data: AddressUpdateManyMutationInput!
      where: AddressWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Address,
}
