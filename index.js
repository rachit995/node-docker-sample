const express = require('express')
const mongoose = require('mongoose')
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_HOST, REDIS_PORT, SESSION_PASSWORD } = require('./config/config')
const redis = require('redis')
const session = require('express-session')
const cors = require('cors')

// MongoDB initialize
const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
const connectWithRetry = () => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => console.log("Successfully connected to DB"))
    .catch((err) => {
      console.log(err)
      setTimeout(connectWithRetry, 5000)
    })
}
connectWithRetry()

// Express app initialize
const app = express()

// Express trust proxy
app.enable('trust proxy')

// Adding CORS
app.use(cors())

// Express session and redis initialize
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT
})
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: SESSION_PASSWORD,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 30000
    }
  })
)

// Parsing body json
app.use(express.json())

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(
    "<h1>Hi there!</h1>"
  )
  console.log("it ran")
})

// Adding routes to app
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')

app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

app.listen(port, () => console.log(`Listening on port ${port}`))
