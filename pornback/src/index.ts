import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const server = http.createServer(app)

import routes from './routes/index'

app.use(routes)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})