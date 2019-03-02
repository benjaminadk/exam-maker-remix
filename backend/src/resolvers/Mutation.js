const signToken = require('../middleware/signToken')
const defaults = require('./defaults')

module.exports = {
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
              create: [{ label: 'A', text: '' }]
            },
            answer: { set: question.answer.concat(false) }
          }
        })
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
      }
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  }
}
