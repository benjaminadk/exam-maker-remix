const signToken = require('../middleware/signToken')
const defaults = require('./defaults')

module.exports = {
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

  updateNode: async (_, args, ctx, info) => {
    try {
      const { id, type, variant, text } = args
      if (type === 'cover') {
        await ctx.prisma.updateCoverNode({
          where: { id },
          data: { variant, text }
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
      const { id, type } = args
      if (type === 'cover') {
        await ctx.prisma.deleteCoverNode({ id })
      }
      return { success: true }
    } catch (error) {
      console.log(error)
      return { success: false }
    }
  }
}
