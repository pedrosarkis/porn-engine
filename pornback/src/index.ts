import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
app.use(express.json())
app.use(cookieParser())


import './config/database'

const server = http.createServer(app)

import routes from './routes/search'
import user from './routes/user'

app.use(routes)
app.use('/user', user)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})