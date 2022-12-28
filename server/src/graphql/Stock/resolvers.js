const { deleteFile } = require("../../utils/upload")

const Stock = {
  Query: {
    findUniqueStock: (_parent, args, { prisma }) => {
      return prisma.stock.findUnique(args)
    },
    findFirstStock: (_parent, args, { prisma }) => {
      return prisma.stock.findFirst(args)
    },
    findManyStock: (_parent, args, { prisma }) => {
      return prisma.stock.findMany(args)
    },
    findManyStockCount: (_parent, args, { prisma }) => {
      return prisma.stock.count(args)
    },
  },
  Mutation: {
    createOneStock: (_parent, args, { prisma }) => {
      return prisma.stock.create(args)
    },
    updateOneStock: (_parent, args, { prisma }) => {
      return prisma.stock.update(args)
    },
    deleteOneStock: async (_parent, args, { prisma }) => {
      return prisma.stock.update({ ...args, data: { delete: true } })
    },
    upsertOneStock: async (_parent, args, { prisma }) => {
      return prisma.stock.upsert(args)
    },
    deleteManyStock: async (_parent, args, { prisma }) => {
      return prisma.stock.deleteMany(args)
    },
    updateManyStock: (_parent, args, { prisma }) => {
      return prisma.stock.updateMany(args)
    },
  },
}

module.exports = {
  Stock,
}
