require('dotenv').config()

const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const cookieParser = require('cookie-parser')
const http = require('http')

const addUserIdToRequest = require('./middleware/addUserIdToRequest')
const addUserToRequest = require('./middleware/addUserToRequest')
const resolvers = require('./resolvers')
const { prisma } = require('./generated')

const { NODE_ENV, FRONTEND_DEV, FRONTEND_PROD, PORT } = process.env
const app = express()
const path = '/graphql'

// whitelist the frontend
const cors = {
  origin: NODE_ENV === 'development' ? FRONTEND_DEV : FRONTEND_PROD,
  credentials: true
}

// create Apollo server
const server = new ApolloServer({
  typeDefs: importSchema('./src/schema.graphql'),
  resolvers,
  playground: {
    settings: {
      'editor.fontFamily': 'Fira Code',
      'editor.fontSize': 12,
      'request.credentials': 'include'
    }
  },
  context: ({ req, res }) => ({
    prisma,
    res,
    userId: req.userId,
    user: req.user
  })
})

app.use(cookieParser(), addUserIdToRequest, addUserToRequest)

const httpServer = http.createServer(app)
server.applyMiddleware({ app, path, server, cors })
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(`server @ http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`subscriptions @ ws://localhost:${PORT}${server.subscriptionsPath}`)
})
