const { Order } = require('./Order/resolvers')
const { Review } = require('./Review/resolvers')
const { Stock } = require('./Stock/resolvers')
const { Product } = require('./Product/resolvers')
const { Address } = require('./Address/resolvers')
const { Restaurant } = require('./Restaurant/resolvers')
const { Admin } = require('./Admin/resolvers')
const { Shipment } = require('./Shipment/resolvers')
const { User } = require('./User/resolvers')
const { Moderator } = require('./Moderator/resolvers')
const { Upload } = require('./Upload/resolvers')

const resolvers = [
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
]

module.exports = { resolvers }
