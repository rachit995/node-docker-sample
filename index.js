const express = require('express')
const mongoose = require('mongoose')
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config')

const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => console.log("Successfully connected to DB"))
    .catch((err) => {
      console.log(err)
      setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry()

const app = express()
app.use(express.json())
const postRouter = require('./routes/postRoutes')

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(
    "<h1>Hi there!</h1>"
  )
})

app.use("/api/v1/posts", postRouter)

app.listen(port, () => console.log(`Listening on port ${port}`))
