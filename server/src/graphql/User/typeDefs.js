const { default: gql } = require('graphql-tag')

const User = gql`
  input UserSendPhoneInput {
    phone: String!
  }

  input UserSendPhoneAndCodeInput {
    phone: String!
    code: String!
    name: String
  }

  input RequestInput {
    phone: String!
    name: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type User {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    phone: String!
    name: String
    code: String!
    reviews(
      where: ReviewWhereInput
      orderBy: ReviewOrderByWithRelationInput
      cursor: ReviewWhereUniqueInput
      take: Int
      skip: Int
      distinct: ReviewScalarFieldEnum
    ): [Review!]!
    orders(
      where: OrderWhereInput
      orderBy: OrderOrderByWithRelationInput
      cursor: OrderWhereUniqueInput
      take: Int
      skip: Int
      distinct: OrderScalarFieldEnum
    ): [Order!]!
    shipments(
      where: ShipmentWhereInput
      orderBy: ShipmentOrderByWithRelationInput
      cursor: ShipmentWhereUniqueInput
      take: Int
      skip: Int
      distinct: ShipmentScalarFieldEnum
    ): [Shipment!]!
    block: Boolean!
    delete: Boolean!
    addresses: [String!]!
    pushIds: [String!]!
    _count: UserCountOutputType
  }

  type Query {
    findMeUser: User
    findUniqueUser(where: UserWhereUniqueInput!): User
    findFirstUser(
      where: UserWhereInput
      orderBy: [UserOrderByWithRelationInput]
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: [UserScalarFieldEnum]
    ): User
    findManyUser(
      where: UserWhereInput
      orderBy: [UserOrderByWithRelationInput]
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: [UserScalarFieldEnum]
    ): [User!]
    findManyUserCount(
      where: UserWhereInput
      orderBy: [UserOrderByWithRelationInput]
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: [UserScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOneUser(data: UserCreateInput!): User!
    updateOneUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User!
    deleteOneUser(where: UserWhereUniqueInput!): User
    upsertOneUser(
      where: UserWhereUniqueInput!
      create: UserCreateInput!
      update: UserUpdateInput!
    ): User
    deleteManyUser(where: UserWhereInput): BatchPayload
    updateManyUser(
      data: UserUpdateManyMutationInput!
      where: UserWhereInput
    ): BatchPayload
    sendUserPhone(data: UserSendPhoneInput!): Boolean
    sendUserCode(data: UserSendPhoneAndCodeInput!): AuthPayload!
    sendRequest(data: RequestInput!): Boolean
  }
`

module.exports = {
  User,
}
