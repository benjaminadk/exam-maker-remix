module.exports = {
  me: async (_, args, ctx, info) => ctx.user,

  exam: async (_, args, ctx, info) => {
    try {
      const exam = await ctx.prisma.exam({ id: args.id })
      return exam
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
