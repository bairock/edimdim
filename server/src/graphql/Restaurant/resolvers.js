const { getTokenForRegisterBilling, registerBilling } = require('../../utils/payment')

const Restaurant = {
  Query: {
    findUniqueRestaurant: (_parent, args, { prisma }) => {
      return prisma.restaurant.findUnique(args)
    },
    findFirstRestaurant: (_parent, args, { prisma }) => {
      return prisma.restaurant.findFirst(args)
    },
    findManyRestaurant: (_parent, args, { prisma }) => {
      return prisma.restaurant.findMany(args)
    },
    findManyRestaurantCount: (_parent, args, { prisma }) => {
      return prisma.restaurant.count(args)
    },
    aggregateRestaurant: (_parent, args, { prisma }) => {
      return prisma.restaurant.aggregate(args)
    },
  },
  Mutation: {
    createOneRestaurant: (_parent, args, { prisma }) => {
      return prisma.restaurant.create(args)
    },
    updateOneRestaurant: (_parent, args, { prisma }) => {
      return prisma.restaurant.update(args)
    },
    deleteOneRestaurant: async (_parent, args, { prisma }) => {
      return prisma.restaurant.delete(args)
    },
    upsertOneRestaurant: async (_parent, args, { prisma }) => {
      return prisma.restaurant.upsert(args)
    },
    deleteManyRestaurant: async (_parent, args, { prisma }) => {
      return prisma.restaurant.deleteMany(args)
    },
    updateManyRestaurant: (_parent, args, { prisma }) => {
      return prisma.restaurant.updateMany(args)
    },
    registerRestaurantForBilling: async (_parent, args) => {
      const token = await getTokenForRegisterBilling()

      console.log(token)

      args.data.bankAccount.details = 'Перевод средств. Дата ${date}. Сумма комиссии ${rub} руб. ${kop} коп., НДС не облагается.'
      args.data.bankAccount.tax = 7

      const shopCode = await registerBilling(token, args.data)

      return shopCode
    },
  },
}

module.exports = {
  Restaurant,
}
