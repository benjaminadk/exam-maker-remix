const signToken = require('../middleware/signToken')

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
      const question = await ctx.prisma.createQuestion({
        connect: { exam: { id: args.id } }
      })
      return question
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
