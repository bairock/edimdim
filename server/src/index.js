const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { PrismaClient } = require('@prisma/client')
const { graphqlUploadExpress } = require('graphql-upload')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { applyMiddleware } = require('graphql-middleware')
const { PrismaSelect } = require('@paljs/plugins')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } = require('apollo-server-core')
const numcap = require('numcap')

const { typeDefs } = require('./graphql/typeDefs')
const { resolvers } = require('./graphql/resolvers')
const { permissions } = require('./utils/permissions')
const sendMail = require('./utils/mailer')
const { htmlNewOrder } = require('./utils/forms')
const { callPhone } = require('./utils/phone')

dotenv.config()

const prisma = new PrismaClient()
const finder = new numcap()

const selects = async (resolve, root, args, context, info) => {
    const result = new PrismaSelect(info).value
    if (Object.keys(result.select).length > 0) {
        args = {
            ...args,
            ...result
        }
    }
    return resolve(root, args, context, info)
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const startServer = async () => {
    const server = new ApolloServer({
        schema: applyMiddleware(schema, selects, permissions),
        context: async (ctx) => {
            const { authorization } = ctx.req.headers
            const token = authorization ? authorization.replace('Bearer ', '') : ''
            const verify = await jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return null
                }
                return decoded
            })
            return {
                prisma,
                verify
            }
        },
        plugins: [
            process.env.NODE_ENV === 'production'
                ? ApolloServerPluginLandingPageDisabled()
                : ApolloServerPluginLandingPageGraphQLPlayground(),
        ]
    })
    await server.start()
    const app = express()
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json())
    app.use(graphqlUploadExpress())
    // app.use('/uploads', express.static(__dirname + '/../../uploads')) // нужно комментировать в продакшене

    app.post('/paid', async (req, res) => {
        if (req.body && req.body.Success) {
            const { OrderId, Status } = req.body
            const data = {
                paymentStatus: {
                    set: Status
                }
            }
            if (Status === 'REJECTED' || Status === 'CANCELED' || Status === 'DEADLINE_EXPIRED') data.orderStatus = {
                set: 'canceled'
            }
            const updateOrder = await prisma.order.update({
                where: {
                    uuid: OrderId
                },
                data
            })
            if (Status === 'CONFIRMED') {
                const moderator = await prisma.moderator.findUnique({
                    where: {
                        restaurantId: updateOrder.restaurantId
                    }
                })
                if (moderator.phone) {
                    await callPhone(moderator.phone)
                }
                sendMail({
                    to: moderator.email,
                    subject: 'Новый заказ',
                    text: 'Новый заказ на сайт Е-димдим',
                    html: htmlNewOrder()
                })
            }
            if (!updateOrder) res.sendStatus(500)
            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }
    })

    server.applyMiddleware({
        app,
        cors: {
            credentials: true
        }
    })
    await new Promise(promises => app.listen({ port: 4000 }, promises))
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    const adminCount = await prisma.admin.count()
    const testUser = await prisma.user.findUnique({ where: { phone: '79991234567' } })
    if (!testUser){
        await prisma.user.create({
            data: {
                name: 'Тестовый Пользователь',
                phone: '79991234567'
            }
        })
    }
    if (adminCount === 0) {
        const password = await bcrypt.hash('123123', 10)
        await prisma.admin.create({
            data: {
                email: 'info@itkitchen.su',
                password
            }
        })
    }
    const promices = []
    const resturants = await prisma.restaurant.findMany({ where: { delete: { equals: false } } })
    for (let restaurant of resturants) {
        if (restaurant.productsCategoriers.length === 0) {
            promices.push(new Promise(async (resolve, reject) => {
                const products = await prisma.product.findMany({
                    where: {
                        restaurantId: restaurant.id
                    },
                    distinct: ['categories'],
                    select: {
                        categories: true
                    }
                })
                const categories = products.reduce((acc, { categories }) => {
                    return [...acc, ...categories]
                }, [])
                const newProductCategories = [...new Set(categories)]
                const updatedRestaurant = await prisma.restaurant.update({
                    where: { id: restaurant.id },
                    data: {
                        productsCategoriers: newProductCategories
                    }
                })
                resolve(updatedRestaurant)
            }))
        }
    }

    await Promise.all(promices)
}
startServer()


// nbogdashin@bk.ru
// nikolai10606
// HDn3jm11^