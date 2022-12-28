const Review = {
  Query: {
    findUniqueReview: (_parent, args, { prisma }) => {
      return prisma.review.findUnique(args)
    },
    findFirstReview: (_parent, args, { prisma }) => {
      return prisma.review.findFirst(args)
    },
    findManyReview: (_parent, args, { prisma }) => {
      return prisma.review.findMany(args)
    },
    findManyReviewCount: (_parent, args, { prisma }) => {
      return prisma.review.count(args)
    },
  },
  Mutation: {
    createOneReview: async (_parent, args, { prisma }) => {
      const createReview = await prisma.review.create({
        data: args.data
      })
      const aggregateReview = await prisma.review.aggregate({
        where: {
          restaurantId: {
            equals: createReview.restaurantId
          }
        },
        _avg: {
          value: true
        }
      })
      if (aggregateReview && aggregateReview._avg && aggregateReview._avg.value) {
        await prisma.restaurant.update({
          where: {
            id: createReview.restaurantId
          },
          data: {
            average: aggregateReview._avg.value
          }
        })
      }
      return prisma.review.findUnique({
        where: {
          id: createReview.id
        },
        select: args.select
      })
    },
    updateOneReview: (_parent, args, { prisma }) => {
      return prisma.review.update(args)
    },
    deleteOneReview: async (_parent, args, { prisma }) => {
      return prisma.review.delete(args)
    },
    upsertOneReview: async (_parent, args, { prisma }) => {
      return prisma.review.upsert(args)
    },
    deleteManyReview: async (_parent, args, { prisma }) => {
      return prisma.review.deleteMany(args)
    },
    updateManyReview: (_parent, args, { prisma }) => {
      return prisma.review.updateMany(args)
    },
  },
}

module.exports = {
  Review,
}
