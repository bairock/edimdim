const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 6)
const sendMail = require('../../utils/mailer')
const { htmlRePassword } = require('../../utils/forms')

const Admin = {
  Query: {
    findMeAdmin: (_parent, args, { prisma, verify }) => {
      args.where = {
        id: verify.id
      }
      return prisma.admin.findUnique(args)
    },
    findUniqueAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.findUnique(args)
    },
    findFirstAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.findFirst(args)
    },
    findManyAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.findMany(args)
    },
    findManyAdminCount: (_parent, args, { prisma }) => {
      return prisma.admin.count(args)
    },
  },
  Mutation: {
    changePasswordAdmin: async (parent, { data }, { prisma, verify }) => {
      const { password, confirmPassword } = data
      const admin = await prisma.admin.findUnique({
        where: {
          id: verify ? verify.id : ""
        }
      })
      if (!admin) {
        throw new Error("not exist")
      }
      if (password !== confirmPassword) {
        throw new Error("password not confirmed")
      }
      const hashRePassword = await bcrypt.hash(password, 10)
      return prisma.admin.update({
        where: { id: verify.id },
        data: {
          password: hashRePassword
        }
      })
    },
    signInAdmin: async (parent, args, { prisma }) => {
      const exist = await prisma.admin.findUnique({
        where: {
          email: args.data.email
        }
      })
      if (!exist) throw new Error('not exist')
      const compareRePassword = bcrypt.compareSync(
        args.data.password,
        exist.repassword ? exist.repassword : ''
      )
      const comparePassword = bcrypt.compareSync(args.data.password, exist.password)
      if (compareRePassword) {
        const hashRePassword = await bcrypt.hash(nanoid(), 10)
        const update = await prisma.admin.update({
          where: {
            email: args.data.email
          },
          data: {
            password: exist.repassword,
            repassword: hashRePassword
          }
        })
        if (!update) throw new Error('error signin')
      }
      if (!comparePassword && !compareRePassword) throw new Error('password incorrect')
      const token = jwt.sign({ id: exist.id, role: 'admin' }, process.env.TOKEN_SECRET)
      return {
        token,
        admin: exist
      }
    },
    createOneAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.create(args)
    },
    updateOneAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.update(args)
    },
    deleteOneAdmin: async (_parent, args, { prisma }) => {
      return prisma.admin.delete(args)
    },
    upsertOneAdmin: async (_parent, args, { prisma }) => {
      return prisma.admin.upsert(args)
    },
    deleteManyAdmin: async (_parent, args, { prisma }) => {
      return prisma.admin.deleteMany(args)
    },
    updateManyAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.updateMany(args)
    },
    repasswordAdmin: async (_parent, { where }, { prisma }) => {
      const exist = await prisma.admin.findUnique({ where })
      if (!exist) {
        throw new Error("not exist")
      }
      const newPass = nanoid()
      const repassword = await bcrypt.hash(newPass, 10)
      await prisma.admin.update({
        where: { id: exist.id },
        data: {
          repassword
        }
      })
      sendMail({
        to: exist.email,
        subject: 'Вход на сайт Е-димдим',
        text: 'Вход на сайт Е-димдим',
        html: htmlRePassword(exist.email, newPass)
      })
      return true
    },
  },
}

module.exports = {
  Admin,
}
