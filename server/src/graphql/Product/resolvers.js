const { deleteFile } = require("../../utils/upload")

const Product = {
  Query: {
    findUniqueProduct: (_parent, args, { prisma }) => {
      return prisma.product.findUnique(args)
    },
    findFirstProduct: (_parent, args, { prisma }) => {
      return prisma.product.findFirst(args)
    },
    findManyProduct: (_parent, args, { prisma }) => {
      return prisma.product.findMany(args)
    },
    findManyProductCount: (_parent, args, { prisma }) => {
      return prisma.product.count(args)
    },
    findManyCategoryByProduct: async (_parent, args, { prisma }) => {
      const products = await prisma.product.findMany({
        where: args.where,
        distinct: ['categories'],
        select: {
          categories: true
        }
      })
      const categories = products.reduce((acc, { categories }) => {
        return [...acc, ...categories]
      }, [])
      return [...new Set(categories)]
    },
    findManyProductGroupByCategory: async (_parent, args, { prisma }) => {
      const products = await prisma.product.findMany(args)
      if (products.length > 0) {
        const restaurant = await prisma.restaurant.findUnique({ where: { id: products[0].restaurantId } })
        // const categories = products.reduce((acc, { categories }) => {
        //   return [...acc, ...categories]
        // }, [])
        const categories = restaurant.productsCategoriers
        const group = [...new Set(categories)].reduce((accumulator, category) => {
          accumulator = [
            ...accumulator,
            {
              title: category,
              data: products.filter(filtering => filtering.categories.some(soming => category === soming))
            },
          ]
          return accumulator
        }, [])
        return group
      }
      return []
    },
  },
  Mutation: {
    createOneProduct: (_parent, args, { prisma }) => {
      return prisma.product.create(args)
    },
    updateOneProduct: (_parent, args, { prisma }) => {
      return prisma.product.update(args)
    },
    deleteOneProduct: async (_parent, args, { prisma }) => {
      return prisma.product.update({ ...args, data: { delete: true } })
    },
    upsertOneProduct: async (_parent, args, { prisma }) => {
      return prisma.product.upsert(args)
    },
    deleteManyProduct: async (_parent, args, { prisma }) => {
      return prisma.product.deleteMany(args)
    },
    updateManyProduct: (_parent, args, { prisma }) => {
      return prisma.product.updateMany(args)
    },
    changeCategoryName: async (_parent, { where, data }, { prisma }) => {
      const { oldName, newName } = data
      const promises = []
      const restaurant = await prisma.restaurant.findUnique({ where })
      const products = await prisma.product.findMany({ where: { categories: { has: oldName } } })
      for (let product of products) {
        const newCategories = product.categories.map(item => item === oldName ? newName : item)
        promises.push(new Promise(async (resolve, reject) => {
          const updatedProduct = await prisma.product.update({
            where: { id: product.id },
            data: {
              categories: newCategories
            }
          })
          resolve(updatedProduct)
        }))
      }
      await Promise.all(promises)
      const newCategories = restaurant.productsCategoriers.map(item => item === oldName ? newName : item)
      await prisma.restaurant.update({
        where,
        data: {
          productsCategoriers: newCategories
        }
      })
      return true
    },
    deleteCategory: async (_parent, { where, data }, { prisma }) => {
      const { name } = data
      const promises = []
      const restaurant = await prisma.restaurant.findUnique({ where })
      const products = await prisma.product.findMany({ where: { categories: { has: name } } })
      for (let product of products) {
        const newCategories = product.categories.filter(item => item !== name)
        promises.push(new Promise(async (resolve, reject) => {
          const updatedProduct = await prisma.product.update({
            where: { id: product.id },
            data: {
              categories: newCategories
            }
          })
          resolve(updatedProduct)
        }))
      }
      await Promise.all(promises)
      const newCategories = restaurant.productsCategoriers.filter(item => item !== name)
      await prisma.restaurant.update({
        where,
        data: {
          productsCategoriers: newCategories
        }
      })
      return true
    },
  },
}

module.exports = {
  Product,
}
