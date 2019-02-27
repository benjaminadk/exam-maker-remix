const ExamFragment = require('../fragments/ExamFragment')

module.exports = {
  me: async (_, args, ctx, info) => ctx.user,

  exam: async (_, args, ctx, info) => await ctx.prisma.exam({ id: args.id }).$fragment(ExamFragment)
}
