const dotenv = require('dotenv')

// const { AppError } = require('../utils/appError.util')

dotenv.config({ path:'./config.env' })

const sendErrorDev = (error, req, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        error,
        stactk: error.stactk
    })
}

// const tokenExpiredError = () => {
//     return new AppError('session expired', 403)
// }

// const tokenInvalidSignatureError = () => {
//     return new AppError('Session invalid', 403)    
// }

// const dbUniqueConstrauntError = () => {
//     return new AppError('The entered email has already been taken', 400)
// }

const globalErrorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'fail'

    if (process.env.NODE_ENV === 'development'){
        sendErrorDev(error, req, res)
    }
}

module.exports = { globalErrorHandler }