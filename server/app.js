const config = require("./util/config")
const express = require("express")
require("express-async-errors")
const cors = require("cors")
const personsRouter = require("./routes/persons")
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")
const middleware = require("./util/middleware")
const mongoose = require("mongoose")

const app = express()

mongoose.set("strictQuery", false)

console.log("Connecting to MongoDB")

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error.message)
    })

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())
app.use(middleware.logger)
app.use(middleware.tokenExtractor)

app.use("/api/blogs", middleware.userExtractor, personsRouter)
app.use("/api/users", userRouter)
app.use("/api/login", authRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
