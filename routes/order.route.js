const express = require('express')

const {
    createOrder,
    getOrder,
    updateOrder,
    deletOrder
} = require('../controllers/order.controller')

const {
    orderExists,
    orderActive
} = require('../middlewares/order.middleware')

const {
    createOrderValidator
} = require('../middlewares/validators.middleware')

const {
    protectSession,
    protectOrder
} = require('../middlewares/auth.middleware')

const orderRoute = express.Router()

orderRoute.use(protectSession)

orderRoute.post('/', createOrderValidator, createOrder)

orderRoute.get('/me/', getOrder)

orderRoute.patch('/:id', orderActive, protectOrder, updateOrder)

orderRoute.delete('/:id', orderActive, protectOrder, deletOrder)

module.exports = { orderRoute }