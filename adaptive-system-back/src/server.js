import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { router } from './components/index.js'
import connectDb from './utils/dbconnection.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(router)

connectDb()
app.listen(PORT, () =>
  console.log('\x1b[32m', `Server listening on port ${PORT}!`)
)
