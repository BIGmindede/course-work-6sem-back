require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const router = require('./routes/index')
const errorMiddleware = require('./middleware/errorMiddleware')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
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