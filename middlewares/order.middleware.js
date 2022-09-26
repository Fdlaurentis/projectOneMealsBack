const { Order } = require('../models/orders.model')
const { Meal } = require('../models/meals.model')
const { Restaurant } = require('../models/restaurants.model')

const { catchAsync } = require('../utils/catchAsync.util')

const orderExists = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const userId = req.sessionUser.id

    const order = await Order.findOne({
        where: { id, userId },
        attributes: ['id', 'totalPrice', 'quantity', 'status'],
        include: {
            model: Meal,
            attributes: ['id', 'name', 'price', 'status'],
            include: {
                model: Restaurant,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
        },
    })

    if (!order) {
        return res.status(404).json({
            status: 'error',
            message: 'Order not found'
        })
    }

    req.order = order
    next()
})

const orderActive = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const order = await Order.findOne({
        where: { id, status: 'active' },
    })

    if (!order) {
        return res.status(404).json({
            status: 'error',
            message: 'Order not found'
        })
    }

    req.order = order
    next()
})

module.exports = { orderExists, orderActive}