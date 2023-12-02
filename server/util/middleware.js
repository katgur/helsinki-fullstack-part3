const morgan = require('morgan')
const jwt = require("jsonwebtoken")
const User = require("../model/user")

morgan.token('body', req => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
})

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization")
    if (authorization && authorization.startsWith("Bearer ")) {
        request.token = authorization.replace("Bearer ", "")
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: "token invalid" })
        }
    }
    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    if (!user) {
        return response.status(401).json({ error: "user not found" })
    }
    request.user = user
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    logger: morgan(':method :url :status :res[content-length] :response-time ms :body'),
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler
}