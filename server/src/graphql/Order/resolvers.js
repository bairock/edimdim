const { createPayment } = require('../../utils/payment')
const { sendNotificationToManyApp } = require('../../utils/app-notication')

const Order = {
  Query: {
    findPayOrder: async (_parent, args, { prisma }) => {
      const order = await prisma.order.findUnique({
        where: {
          uuid: args.where.uuid
        },
        include: {
          restaurant: true
        }
      })

      const data = await createPayment(order.amount, order.restaurant.paymentId)

      if (!data && !data.Success) throw new Error('payment url not exist')

      return data.PaymentURL
    },
    findUniqueOrder: (_parent, args, { prisma }) => {
      return prisma.order.findUnique(args)
    },
    findFirstOrder: (_parent, args, { prisma }) => {
      return prisma.order.findFirst(args)
    },
    findManyOrder: (_parent, args, { prisma }) => {
      return prisma.order.findMany(args)
    },
    findManyOrderCount: (_parent, args, { prisma }) => {
      return prisma.order.count(args)
    },
  },
  Mutation: {
    createOneOrder: async (_parent, args, { prisma, verify }) => {
      const id = verify.id

      const { shipments } = await prisma.user.findUnique({
        where: {
          id
        },
        select: {
          shipments: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              userId: true,
              productId: true,
              product: {
                select: {
                  id: true,
                  createdAt: true,
                  updatedAt: true,
                  name: true,
                  image: true,
                  price: true,
                  restaurant: {
                    select: {
                      id: true,
                      createdAt: true,
                      updatedAt: true,
                      name: true,
                      logo: true,
                      paymentId: true
                    }
                  },
                  restaurantId: true
                }
              },
              count: true
            }
          },
        }
      })

      if (shipments.length < 1) throw new Error('shipments not exist')

      const restaurantId = shipments[0].product.restaurantId

      const amount = shipments.reduce((acc, object) => {
        const sum = object.count * object.product.price
        return acc + sum
      }, 0)

      const paymentData = await createPayment(amount, shipments[0].product.restaurant.paymentId)

      if (!paymentData && !paymentData.Success) throw new Error('payment url not exist')

      const order = await prisma.order.create({
        data: {
          ...args.data,
          uuid: paymentData.OrderId,
          pid: paymentData.PaymentId,
          amount,
          shipments,
          user: {
            connect: {
              id
            }
          },
          restaurant: {
            connect: {
              id: restaurantId
            }
          }
        },
        ...args.select.order
      })

      await prisma.shipment.deleteMany({
        where: {
          userId: {
            equals: id
          }
        }
      })

      const moderator = await prisma.moderator.findUnique({
        where: { restaurantId }
      })

      return {
        order,
        payment: paymentData.PaymentURL
      }
    },
    updateOneOrder: async (_parent, args, { prisma, verify }) => {
      const order = await prisma.order.findUnique({
        where: args.where
      })
      if (args.data.orderStatus && args.data.orderStatus && args.data.orderStatus.set === 'done') {
        if (order.orderStatus === 'confirmed') {
          const restaurant = await prisma.restaurant.findUnique({
            where: {
              id: order.restaurantId
            }
          })
          const percentPayoff = 10
          const payoff = (order.amount * percentPayoff) / 100
          await prisma.restaurant.update({
            where: {
              id: restaurant.id
            },
            data: {
              payoff: {
                increment: payoff
              }
            }
          })
        }
      }
      if (args.data.orderStatus && args.data.orderStatus && args.data.orderStatus.set === 'cancelled') {
        if (order.orderStatus === 'done') {
          const restaurant = await prisma.restaurant.findUnique({
            where: {
              id: order.restaurantId
            }
          })
          const percentPayoff = 10
          const payoff = (order.amount * percentPayoff) / 100
          await prisma.restaurant.update({
            where: {
              id: restaurant.id
            },
            data: {
              payoff: {
                decrement: payoff
              }
            }
          })
        }
      }
      const updatedOrder = await prisma.order.update(args)
      if (verify && verify.role === 'moderator') {
        const order = await prisma.order.findUnique({
          where: args.where,
          select: {
            user: true
          }
        })
        let message = ''
        if (updatedOrder.orderStatus === 'confirmed') {
          message = 'Ресторан подтвердил ваш заказ'
        }
        if (updatedOrder.orderStatus === 'canceled') {
          message = 'Ресторан отменил ваш заказ'
        }
        if (updatedOrder.orderStatus === 'done') {
          message = 'Ваш заказ доставлен, не забудьте оставить отзыв'
        }
        if (message) {
          sendNotificationToManyApp({
            message,
            pushIds: order.user.pushIds
          })
        }
      }
      return updatedOrder
    },
    deleteOneOrder: async (_parent, args, { prisma }) => {
      return prisma.order.delete(args)
    },
    upsertOneOrder: async (_parent, args, { prisma }) => {
      return prisma.order.upsert(args)
    },
    deleteManyOrder: async (_parent, args, { prisma }) => {
      return prisma.order.deleteMany(args)
    },
    updateManyOrder: (_parent, args, { prisma }) => {
      return prisma.order.updateMany(args)
    },
  },
}

module.exports = {
  Order,
}
