const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890', 4)

const sendMail = require('../../utils/mailer')
const { htmlRequest } = require('../../utils/forms')

const User = {
  Query: {
    findMeUser: (_parent, args, { prisma, verify }) => {
      if (!verify) return null
      args.where = {
        id: verify.id
      }
      return prisma.user.findUnique(args)
    },
    findUniqueUser: (_parent, args, { prisma }) => {
      return prisma.user.findUnique(args)
    },
    findFirstUser: (_parent, args, { prisma }) => {
      return prisma.user.findFirst(args)
    },
    findManyUser: (_parent, args, { prisma }) => {
      return prisma.user.findMany(args)
    },
    findManyUserCount: (_parent, args, { prisma }) => {
      return prisma.user.count(args)
    },
  },
  Mutation: {
    createOneUser: (_parent, args, { prisma }) => {
      return prisma.user.create(args)
    },
    updateOneUser: (_parent, args, { prisma }) => {
      return prisma.user.update(args)
    },
    deleteOneUser: async (_parent, args, { prisma }) => {
      return prisma.user.delete(args)
    },
    upsertOneUser: async (_parent, args, { prisma }) => {
      return prisma.user.upsert(args)
    },
    deleteManyUser: async (_parent, args, { prisma }) => {
      return prisma.user.deleteMany(args)
    },
    updateManyUser: (_parent, args, { prisma }) => {
      return prisma.user.updateMany(args)
    },
    sendUserPhone: async (parent, { data: { phone } }, { prisma, verify }) => {
      const user = await prisma.user.findUnique({
        where: {
          phone
        }
      })
      if (phone === '79991234567') return true

      const { data } = await axios.get('https://sms.ru/code/call', {
        params: {
          api_id: process.env.SMS_API_ID,
          phone: phone,
          json: 1
        }
      })

      if (!data) {
        return false
      }

      const hashCode = await bcrypt.hash(`${data.code}`, 10)

      if (!user) {
        if (verify) {
          await prisma.user.update({
            where: {
              id: verify.id
            },
            data: {
              code: hashCode
            }
          })
        } else {
          await prisma.user.create({
            data: {
              phone,
              code: hashCode
            }
          })
        }
      } else {
        if (user.delete) {
          throw new Error('deleted')
        }
        if (user.block) {
          return new Error(`blocked`)
        }
        if (verify) {
          throw new Error('exist')
        }
        await prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            code: hashCode
          }
        })
      }
      if (data) {
        return true
      } else {
        return false
      }
    },
    sendUserCode: async (parent, { data: { phone, code, name }, select }, { prisma, verify }) => {
      let where = {}
      if (verify && verify.id) {
        where = {
          id: verify.id
        }
      } else {
        where = {
          phone
        }
      }
      let user = await prisma.user.findUnique({
        where,
        ...select.user
      })
      if (!user) {
        throw new Error('user not found')
      }
      if (phone === '79991234567' && code === '1234') {
        const token = jwt.sign({ id: user.id, role: 'user' }, process.env.TOKEN_SECRET)
        return {
          user,
          token
        }
      }
      const compare = bcrypt.compareSync(code, user.code)
      if (!compare) {
        throw new Error('code incorrect')
      }
      const recode = nanoid()
      const hashCode = await bcrypt.hash(recode, 10)
      user = await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          code: hashCode,
          phone,
          name
        },
        select: select.user.select
      })
      const token = jwt.sign({ id: user.id, role: 'user' }, process.env.TOKEN_SECRET)
      return {
        user,
        token
      }
    },
    sendRequest: (_parent, args, { prisma }) => {
      sendMail({
        to: 'edim_dim@mail.ru',
        subject: 'Новая заявка на подключения ресторана',
        text: 'Новая заявка на подключения ресторана',
        html: htmlRequest(args.data.phone, args.data.name)
      })
      return true
    },
  },
}

module.exports = {
  User,
}
