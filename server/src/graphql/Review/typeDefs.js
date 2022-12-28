const { default: gql } = require('graphql-tag')

const Review = gql`
  type Review {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    value: Float!
    description: String!
    user: User!
    userId: String!
    restaurant: Restaurant!
    restaurantId: String!
    block: Boolean!
    delete: Boolean!
    order: Order
  }

  type Query {
    findUniqueReview(where: ReviewWhereUniqueInput!): Review
    findFirstReview(
      where: ReviewWhereInput
      orderBy: [ReviewOrderByWithRelationInput]
      cursor: ReviewWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ReviewScalarFieldEnum]
    ): Review
    findManyReview(
      where: ReviewWhereInput
      orderBy: [ReviewOrderByWithRelationInput]
      cursor: ReviewWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ReviewScalarFieldEnum]
    ): [Review!]
    findManyReviewCount(
      where: ReviewWhereInput
      orderBy: [ReviewOrderByWithRelationInput]
      cursor: ReviewWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ReviewScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOneReview(data: ReviewCreateInput!): Review!
    updateOneReview(
      data: ReviewUpdateInput!
      where: ReviewWhereUniqueInput!
    ): Review!
    deleteOneReview(where: ReviewWhereUniqueInput!): Review
    upsertOneReview(
      where: ReviewWhereUniqueInput!
      create: ReviewCreateInput!
      update: ReviewUpdateInput!
    ): Review
    deleteManyReview(where: ReviewWhereInput): BatchPayload
    updateManyReview(
      data: ReviewUpdateManyMutationInput!
      where: ReviewWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Review,
}
