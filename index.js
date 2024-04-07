import { config } from "dotenv"
import express, { json } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connect } from "mongoose"
import fileUpload from 'express-fileupload'

import { errorMiddleware } from './middleware/errorMiddleware.js'
import { authorizationRouter } from './routes/authRouter.js'
import { categoryRouter } from './routes/categoryRouter.js'
import { reviewRouter } from './routes/reviewRouter.js'
import { userRouter } from './routes/userRouter.js'
import { requestRouter } from './routes/requestRouter.js'

config()

const app = express()

app.use(json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api/auth', authorizationRouter)
app.use('/api/category', categoryRouter)
app.use('/api/review', reviewRouter)
app.use('/api/user', userRouter)
app.use('/api/request', requestRouter)
app.use(errorMiddleware)

const start = async () => {
    try {
        await connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(5000, () => {
            console.log(`Server started at PORT=${process.env.SERVER_PORT}`)
        })
    } catch(e) {
        console.log(e)
    }
}

start()