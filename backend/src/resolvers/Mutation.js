const bcrypt = require('bcryptjs')
const md5 = require('md5')
const signToken = require('../middleware/signToken')
const defaults = require('./utils/defaults')
const validateSignup = require('./utils/validateSignup')

module.exports = {
  signup: async (_, args, ctx, info) => {
    validateSignup(args)
    const email = args.email.trim().toLowerCase()
    const userExists = await ctx.prisma.$exists.user({ email })
    if (userExists) {
      throw new Error(`User exists for ${email}`)
    }
    try {
      const hashedEmail = md5(email)
      const image = `https://www.gravatar.com/avatar/${hashedEmail}?d=mp`
      const password = await bcrypt.hash(args.password, 10)
      const user = await ctx.prisma.createUser({
        name: args.name,
        email,
        password,
        image,
        role: 'USER'
      })
      signToken(ctx.res, user.id)
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  signin: async (_, args, ctx, info) => {
    const email = args.email.trim().toLowerCase()
    const user = await ctx.prisma.user({ email })
    if (!user) {
      throw new Error(`No User for ${email}.`)
    }
    const isMatch = await bcrypt.compare(args.password, user.password)
    if (!isMatch) {
      throw new Error('Invalid password.')
    }
    try {
      signToken(ctx.res, user.id)
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  signout: async (_, args, ctx, info) => {
    try {
      ctx.res.clearCookie(process.env.COOKIE)
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  googleSignin: async (_, args, ctx, info) => {
    try {
      const { googleID, ...rest } = args.data
      const exists = await ctx.prisma.$exists.user({ googleID })
      if (exists) {
        let user = await ctx.prisma.updateUser({ where: { googleID }, data: { ...rest } })
        signToken(ctx.res, user.id)
      } else {
        let user = await ctx.prisma.createUser({ ...args.data })
        signToken(ctx.res, user.id)
      }
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  createExam: async (_, args, ctx, info) => {
    try {
      const exam = await ctx.prisma.createExam({
        ...args.data,
        cover: {
          create: defaults.cover
        },
        user: { connect: { id: ctx.userId } }
      })
      return exam
    } catch (error) {
      console.log(error)
      return null
    }
  },

  updateExam: async (_, args, ctx, info) => {
    try {
      await ctx.prisma.updateExam({
        where: { id: args.id },
        data: { ...args.data }
      })
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  deleteExam: async (_, args, ctx, info) => {
    try {
      await ctx.prisma.deleteExam({
        id: args.id
      })
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  createQuestion: async (_, args, ctx, info) => {
    try {
      await ctx.prisma.updateExam({
        where: { id: args.id },
        data: {
          test: {
            create: defaults.question
          }
        }
      })
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  updateQuestion: async (_, args, ctx, info) => {
    try {
      await ctx.prisma.updateQuestion({
        where: { id: args.id },
        data: { ...args.data }
      })
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  createNode: async (_, args, ctx, info) => {
    try {
      const { id, type } = args
      const payload = {
        where: { id },
        data: {
          [type]: {
            create: [{ variant: 1, text: '' }]
          }
        }
      }
      if (type === 'cover') {
        await ctx.prisma.updateExam(payload)
      } else if (type === 'question') {
        await ctx.prisma.updateQuestion(payload)
      } else if (type === 'choices') {
        const question = await ctx.prisma.question({ id })
        await ctx.prisma.updateQuestion({
          where: { id },
          data: {
            choices: {
              create: [{ label: '', text: '' }]
            },
            answer: { set: question.answer.concat(false) }
          }
        })
      } else if (type === 'explanation') {
        await ctx.prisma.updateQuestion(payload)
      }
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  updateNode: async (_, args, ctx, info) => {
    try {
      const { id, type, variant, text } = args
      const payload = { where: { id }, data: { variant, text } }
      if (type === 'cover') {
        await ctx.prisma.updateCoverNode(payload)
      } else if (type === 'question') {
        await ctx.prisma.updateQuestionNode(payload)
      } else if (type === 'choices') {
        await ctx.prisma.updateChoice({
          where: { id },
          data: { text }
        })
      } else if (type === 'explanation') {
        await ctx.prisma.updateExplanationNode(payload)
      }
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  },

  deleteNode: async (_, args, ctx, info) => {
    try {
      const { id, type, questionId, answers } = args
      if (type === 'cover') {
        await ctx.prisma.deleteCoverNode({ id })
      } else if (type === 'question') {
        await ctx.prisma.deleteQuestionNode({ id })
      } else if (type === 'choices') {
        await ctx.prisma.deleteChoice({ id })
        await ctx.prisma.updateQuestion({
          where: { id: questionId },
          data: { answer: { set: answers } }
        })
      } else if (type === 'explanation') {
        await ctx.prisma.deleteExplanationNode({ id })
      }
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  }
}
