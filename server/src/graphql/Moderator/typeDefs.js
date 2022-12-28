const { default: gql } = require('graphql-tag')

const Moderator = gql`
  input ModeratorSignInInput {
    email: String!
    password: String!
  }

  input ReorderModeratorsInput {
    oldIndex: Int!
    newIndex: Int!
  } 

  type ModeratorAuthorizationPayload {
    moderator: Moderator!
    token: String!
  }

  type Moderator {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String!
    password: String!
    repassword: String
    restaurant: Restaurant
    restaurantId: String
    block: Boolean!
    delete: Boolean!
    weight: Int!
    phone: String
  }

  type Query {
    findMeModerator: Moderator
    findUniqueModerator(where: ModeratorWhereUniqueInput!): Moderator
    findFirstModerator(
      where: ModeratorWhereInput
      orderBy: [ModeratorOrderByWithRelationInput]
      cursor: ModeratorWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ModeratorScalarFieldEnum]
    ): Moderator
    findManyModerator(
      where: ModeratorWhereInput
      orderBy: [ModeratorOrderByWithRelationInput]
      cursor: ModeratorWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ModeratorScalarFieldEnum]
    ): [Moderator!]
    findManyModeratorCount(
      where: ModeratorWhereInput
      orderBy: [ModeratorOrderByWithRelationInput]
      cursor: ModeratorWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ModeratorScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    signInModerator(data: ModeratorSignInInput!): ModeratorAuthorizationPayload!
    changePasswordModerator(data: ChangePasswordInput!): Moderator!
    createOneModerator(data: ModeratorCreateInput!): Moderator!
    updateOneModerator(
      data: ModeratorUpdateInput!
      where: ModeratorWhereUniqueInput!
    ): Moderator!
    deleteOneModerator(where: ModeratorWhereUniqueInput!): Moderator
    upsertOneModerator(
      where: ModeratorWhereUniqueInput!
      create: ModeratorCreateInput!
      update: ModeratorUpdateInput!
    ): Moderator
    deleteManyModerator(where: ModeratorWhereInput): BatchPayload
    updateManyModerator(
      data: ModeratorUpdateManyMutationInput!
      where: ModeratorWhereInput
    ): BatchPayload
    reorderModerators(where: ReorderModeratorsInput!): [Moderator!]
    repasswordModerator(where: ModeratorWhereUniqueInput!): Boolean!
  }
`

module.exports = {
  Moderator,
}
