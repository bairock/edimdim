const Address = {
  Query: {
    findUniqueAddress: (_parent, args, { prisma }) => {
      return prisma.address.findUnique(args)
    },
    findFirstAddress: (_parent, args, { prisma }) => {
      return prisma.address.findFirst(args)
    },
    findManyAddress: (_parent, args, { prisma }) => {
      return prisma.address.findMany(args)
    },
    findManyAddressCount: (_parent, args, { prisma }) => {
      return prisma.address.count(args)
    },
  },
  Mutation: {
    createOneAddress: (_parent, args, { prisma }) => {
      return prisma.address.create(args)
    },
    updateOneAddress: (_parent, args, { prisma }) => {
      return prisma.address.update(args)
    },
    deleteOneAddress: async (_parent, args, { prisma }) => {
      return prisma.address.delete(args)
    },
    upsertOneAddress: async (_parent, args, { prisma }) => {
      return prisma.address.upsert(args)
    },
    deleteManyAddress: async (_parent, args, { prisma }) => {
      return prisma.address.deleteMany(args)
    },
    updateManyAddress: (_parent, args, { prisma }) => {
      return prisma.address.updateMany(args)
    },
  },
}

module.exports = {
  Address,
}
