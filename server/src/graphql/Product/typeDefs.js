const { default: gql } = require('graphql-tag')

const Product = gql`
  input ChangeCategoryNameInput {
    oldName: String!
    newName: String!
  }
  input DeleteCategoryInput {
    name: String!
  }

  type Product {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    description: String!
    categories: [String!]!
    image: String!
    shipments(
      where: ShipmentWhereInput
      orderBy: ShipmentOrderByWithRelationInput
      cursor: ShipmentWhereUniqueInput
      take: Int
      skip: Int
      distinct: ShipmentScalarFieldEnum
    ): [Shipment!]!
    price: Int!
    restaurant: Restaurant!
    restaurantId: String!
    publish: Boolean!
    delete: Boolean!
    _count: ProductCountOutputType
  }

  type Query {
    findUniqueProduct(where: ProductWhereUniqueInput!): Product
    findFirstProduct(
      where: ProductWhereInput
      orderBy: [ProductOrderByWithRelationInput]
      cursor: ProductWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ProductScalarFieldEnum]
    ): Product
    findManyProduct(
      where: ProductWhereInput
      orderBy: [ProductOrderByWithRelationInput]
      cursor: ProductWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ProductScalarFieldEnum]
    ): [Product!]
    findManyProductCount(
      where: ProductWhereInput
      orderBy: [ProductOrderByWithRelationInput]
      cursor: ProductWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ProductScalarFieldEnum]
    ): Int!
    findManyCategoryByProduct(where: ProductWhereInput): [String]
    findManyProductGroupByCategory(where: ProductWhereInput): [Json]
  }

  type Mutation {
    createOneProduct(data: ProductCreateInput!): Product!
    updateOneProduct(
      data: ProductUpdateInput!
      where: ProductWhereUniqueInput!
    ): Product!
    deleteOneProduct(where: ProductWhereUniqueInput!): Product
    upsertOneProduct(
      where: ProductWhereUniqueInput!
      create: ProductCreateInput!
      update: ProductUpdateInput!
    ): Product
    deleteManyProduct(where: ProductWhereInput): BatchPayload
    updateManyProduct(
      data: ProductUpdateManyMutationInput!
      where: ProductWhereInput
    ): BatchPayload
    changeCategoryName(
      where: RestaurantWhereUniqueInput!
      data: ChangeCategoryNameInput!
    ): Boolean!
    deleteCategory(
      where: RestaurantWhereUniqueInput!
      data: DeleteCategoryInput!
    ): Boolean!
  }
`

module.exports = {
  Product,
}
