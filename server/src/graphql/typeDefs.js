const { Order } = require('./Order/typeDefs')
const { Review } = require('./Review/typeDefs')
const { Stock } = require('./Stock/typeDefs')
const { Product } = require('./Product/typeDefs')
const { Address } = require('./Address/typeDefs')
const { Restaurant } = require('./Restaurant/typeDefs')
const { Admin } = require('./Admin/typeDefs')
const { Shipment } = require('./Shipment/typeDefs')
const { User } = require('./User/typeDefs')
const { Moderator } = require('./Moderator/typeDefs')
const { Upload } = require('./Upload/typeDefs')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const { sdlInputs } = require('@paljs/plugins')

const typeDefs = mergeTypeDefs([
  sdlInputs(),
  User,
  Shipment,
  Admin,
  Restaurant,
  Address,
  Product,
  Stock,
  Review,
  Order,
  Moderator,
  Upload,
])

module.exports = { typeDefs }
