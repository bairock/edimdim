const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 6)

const { htmlLoginPassword, htmlRePassword } = require('../../utils/forms')
const sendMail = require('../../utils/mailer')

const Moderator = {
  Query: {
    findMeModerator: (_parent, args, { prisma, verify }) => {
      args.where = {
        id: verify.id
      }
      return prisma.moderator.findUnique(args)
    },
    findUniqueModerator: (_parent, args, { prisma }) => {
      return prisma.moderator.findUnique(args)
    },
    findFirstModerator: (_parent, args, { prisma }) => {
      return prisma.moderator.findFirst(args)
    },
    findManyModerator: (_parent, args, { prisma }) => {
      return prisma.moderator.findMany(args)
    },
    findManyModeratorCount: (_parent, args, { prisma }) => {
      return prisma.moderator.count(args)
    },
  },
  Mutation: {
    changePasswordModerator: async (parent, { data }, { prisma, verify }) => {
      const { password, confirmPassword } = data
      const moderator = await prisma.moderator.findUnique({
        where: {
          id: verify ? verify.id : ""
        }
      })
      if (!moderator) {
        throw new Error("not exist")
      }
      if (password !== confirmPassword) {
        throw new Error("password not confirmed")
      }
      const hashRePassword = await bcrypt.hash(password, 10)
      return prisma.moderator.update({
        where: { id: verify.id },
        data: {
          password: hashRePassword
        }
      })
    },
    signInModerator: async (parent, args, { prisma }) => {
      const exist = await prisma.moderator.findUnique({
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
        const update = await prisma.moderator.update({
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
      const token = jwt.sign({ id: exist.id, role: 'moderator' }, process.env.TOKEN_SECRET)
      return {
        token,
        moderator: exist
      }
    },
    createOneModerator: async (_parent, args, { prisma }) => {
      const password = nanoid()
      const passwordHash = await bcrypt.hash(password, 10)
      if (!args.data.password) args.data.password = passwordHash
      const moderator = await prisma.moderator.create(args)
      sendMail({
        to: moderator.email,
        subject: 'Вход на сайт Е-димдим',
        text: 'Вход на сайт Е-димдим',
        html: htmlLoginPassword(moderator.email, password)
      })
      return moderator
    },
    updateOneModerator: (_parent, args, { prisma }) => {
      return prisma.moderator.update(args)
    },
    deleteOneModerator: async (_parent, args, { prisma }) => {
      return prisma.moderator.delete(args)
    },
    upsertOneModerator: async (_parent, args, { prisma }) => {
      return prisma.moderator.upsert(args)
    },
    deleteManyModerator: async (_parent, args, { prisma }) => {
      return prisma.moderator.deleteMany(args)
    },
    updateManyModerator: (_parent, args, { prisma }) => {
      return prisma.moderator.updateMany(args)
    },
    reorderModerators: async (_parent, args, { prisma }) => {
      const { where, select } = args
      const { oldIndex, newIndex } = where
      const moderators = await prisma.moderator.findMany({ orderBy: { weight: 'desc' } })

      const prevModerators = [...moderators]

      const oldItem = prevModerators[oldIndex]
      const toDown = oldIndex < newIndex
      const target = toDown ? newIndex + 1 : newIndex
      const promices = []

      prevModerators.splice(oldIndex, 1, undefined)
      prevModerators.splice(target, 0, oldItem)

      for (let index = 0; index < prevModerators.length; index++) {
        const moder = prevModerators[index]
        if (moder) {
          promices.push(new Promise(async (resolve, reject) => {
            const updateedModer = await prisma.moderator.update({
              where: { id: moder.id },
              data: {
                weight: { set: prevModerators.length - index }
              }
            })
            resolve(updateedModer)
          }))
        }
      }

      await Promise.all(promices)

      return await prisma.moderator.findMany({ select })
    },
    repasswordModerator: async (_parent, { where }, { prisma }) => {
      const exist = await prisma.moderator.findUnique({ where })
      if (!exist) {
        throw new Error("not exist")
      }
      const newPass = nanoid()
      const repassword = await bcrypt.hash(newPass, 10)
      await prisma.moderator.update({
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
  Moderator,
}
