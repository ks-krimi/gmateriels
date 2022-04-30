require('./config/db_conf')
const { HTTP_PORT, ORIGIN, IS_PROD } = require('./config')
const express = require('express')
const http = require('http')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { ApolloServer } = require('apollo-server-express')
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginDrainHttpServer
} = require('apollo-server-core')
const { checkUser, requireAuth } = require('./middlewares/auth.middleware')
const userRoutes = require('./routes/user.routes')
import schema from './schemas'

// initialise a new express app
const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())

// use cors middleware
app.use(cors({ origin: ORIGIN, credentials: true }))

// auths middlewares
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})

// routes
app.use('/api/user', userRoutes)

// start server
;(async () => {
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    schema,
    plugins: [
      IS_PROD
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground({
            settings: { 'request.credentials': 'include' }
          }),
      // Arrêt correct du serveur HTTP.
      ApolloServerPluginDrainHttpServer({ httpServer })
    ]
  })

  await server.start()

  server.applyMiddleware({ app })

  // server
  httpServer.listen(HTTP_PORT, () => {
    console.log(
      `Le serveur est écouté sur http://localhost:${HTTP_PORT}${server.graphqlPath}`
    )
  })

  // handle when there has an error
  process.on('unhandledRejection', (err, promise) => {
    console.log(`Il a ces erreurs : ${err}`)
    httpServer.close(() => process.exit(1))
  })
})()
