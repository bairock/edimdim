const Shipment = {
  Query: {
    findUniqueShipment: (_parent, args, { prisma }) => {
      return prisma.shipment.findUnique(args)
    },
    findFirstShipment: (_parent, args, { prisma }) => {
      return prisma.shipment.findFirst(args)
    },
    findManyShipment: (_parent, args, { prisma }) => {
      return prisma.shipment.findMany(args)
    },
    findManyShipmentCount: (_parent, args, { prisma }) => {
      return prisma.shipment.count(args)
    },
  },
  Mutation: {
    createOneShipment: (_parent, args, { prisma }) => {
      return prisma.shipment.create(args)
    },
    updateOneShipment: (_parent, args, { prisma }) => {
      return prisma.shipment.update(args)
    },
    deleteOneShipment: async (_parent, args, { prisma }) => {
      return prisma.shipment.delete(args)
    },
    upsertOneShipment: async (_parent, args, { prisma }) => {
      return prisma.shipment.upsert(args)
    },
    deleteManyShipment: async (_parent, args, { prisma }) => {
      return prisma.shipment.deleteMany(args)
    },
    updateManyShipment: (_parent, args, { prisma }) => {
      return prisma.shipment.updateMany(args)
    },
  },
}

module.exports = {
  Shipment,
}
