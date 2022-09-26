const express = require('express')

//controllers
const {
    createUser,
    login,
    updateUser,
    deleteUser
} = require('../controllers/user.controller')

//Middlewares

const {
    createUserValidator
} = require('../middlewares/validators.middleware')

const {
    userExist
} = require('../middlewares/user.middleware')

const {
    protectSession,
    protectUserAccount
} = require('../middlewares/auth.middleware')

const userRouter = express.Router()

userRouter.post('/signup', createUserValidator, createUser)

userRouter.post('/login', login)

userRouter.use(protectSession)

userRouter.patch('/:id', userExist, protectUserAccount, updateUser)

userRouter.delete('/:id', userExist, protectUserAccount, deleteUser)

module.exports = { userRouter }