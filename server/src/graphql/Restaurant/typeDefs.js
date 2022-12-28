const { default: gql } = require('graphql-tag')

const Restaurant = gql`
  type Restaurant {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    logo: String!
    image: String
    description: String
    average: Float!
    productsCategoriers: [String!]!
    addresses(
      where: AddressWhereInput
      orderBy: AddressOrderByWithRelationInput
      cursor: AddressWhereUniqueInput
      take: Int
      skip: Int
      distinct: AddressScalarFieldEnum
    ): [Address!]!
    products(
      where: ProductWhereInput
      orderBy: ProductOrderByWithRelationInput
      cursor: ProductWhereUniqueInput
      take: Int
      skip: Int
      distinct: ProductScalarFieldEnum
    ): [Product!]!
    stocks(
      where: StockWhereInput
      orderBy: StockOrderByWithRelationInput
      cursor: StockWhereUniqueInput
      take: Int
      skip: Int
      distinct: StockScalarFieldEnum
    ): [Stock!]!
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
    moderator: Moderator
    categories: [String!]!
    minimumOrderAmount: Decimal!
    deliveryCondition: String
    legalInformation: String
    payoff: Decimal!
    publish: Boolean!
    delete: Boolean!
    paymentId: String
    city: String
    _count: RestaurantCountOutputType
  }

  type Query {
    findUniqueRestaurant(where: RestaurantWhereUniqueInput!): Restaurant
    findFirstRestaurant(
      where: RestaurantWhereInput
      orderBy: [RestaurantOrderByWithRelationInput]
      cursor: RestaurantWhereUniqueInput
      take: Int
      skip: Int
      distinct: [RestaurantScalarFieldEnum]
    ): Restaurant
    findManyRestaurant(
      where: RestaurantWhereInput
      orderBy: [RestaurantOrderByWithRelationInput]
      cursor: RestaurantWhereUniqueInput
      take: Int
      skip: Int
      distinct: [RestaurantScalarFieldEnum]
    ): [Restaurant!]
    findManyRestaurantCount(
      where: RestaurantWhereInput
      orderBy: [RestaurantOrderByWithRelationInput]
      cursor: RestaurantWhereUniqueInput
      take: Int
      skip: Int
      distinct: [RestaurantScalarFieldEnum]
    ): Int!
    aggregateRestaurant(
      where: RestaurantWhereInput
      orderBy: [RestaurantOrderByWithRelationInput]
      cursor: RestaurantWhereUniqueInput
      take: Int
      skip: Int
    ): AggregateRestaurant
  }

  input OrganizationAddressInput {
    type: String!
    zip: String!
    country: String!
    city: String!
    street: String!
  }

  input CeoInput {
    firstName: String!
    lastName: String!
    middleName: String!
    birthDate: String!
    phone: String!
    country: String!
  }

  input BankAccountInput {
    account: String!
    bankName: String!
    bik: String!
  }

  input RegisterRestaurantForBillingInput {
    billingDescriptor: String!
    fullName: String!
    name: String!
    inn: String!
    kpp: String!
    ogrn: String!
    smz: Boolean!
    addresses: [OrganizationAddressInput!]!
    email: String!
    ceo: CeoInput!
    siteUrl: String!
    bankAccount: BankAccountInput!
  }

  type Mutation {
    createOneRestaurant(data: RestaurantCreateInput!): Restaurant!
    updateOneRestaurant(
      data: RestaurantUpdateInput!
      where: RestaurantWhereUniqueInput!
    ): Restaurant!
    deleteOneRestaurant(where: RestaurantWhereUniqueInput!): Restaurant
    upsertOneRestaurant(
      where: RestaurantWhereUniqueInput!
      create: RestaurantCreateInput!
      update: RestaurantUpdateInput!
    ): Restaurant
    deleteManyRestaurant(where: RestaurantWhereInput): BatchPayload
    updateManyRestaurant(
      data: RestaurantUpdateManyMutationInput!
      where: RestaurantWhereInput
    ): BatchPayload
    registerRestaurantForBilling(data: RegisterRestaurantForBillingInput!): String!
  }
`

module.exports = {
  Restaurant,
}
