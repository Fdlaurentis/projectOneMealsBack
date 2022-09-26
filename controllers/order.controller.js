const { Order } = require('../models/orders.model')
const { Meal } = require('../models/meals.model')
const { Restaurant } = require('../models/restaurants.model')

const { catchAsync } = require('../utils/catchAsync.util')

const createOrder = catchAsync( async(req, res, next) => {
    const { sessionUser } = req
    const { quantity, mealId } = req.body

    const meal = await Meal.findOne({
        where: ( { id: mealId, status: 'active' } )        
    })

    if ( !meal ){
        return res.status(404).json({
            status: 'error',
            message: 'Meal not found'
        })
    }

    const newOrder = await Order.create({
        mealId,
        userId: sessionUser.id,
        totalPrice: quantity * meal.price,
        quantity
    })

    res.status(200).json({
        status: 'succes',
        data: { newOrder }
    })
})

const getOrder = catchAsync( async(req, res, next) => {
    const { sessionUser } = req

    const order = await Order.findAll({
        where: { userId: sessionUser.id},
        attributes: { exclude: ['mealId', 'userId', 'updatedAt', 'createdAt'] },
        include: {
            model: Meal,
            //where: {id: Order.mealId },
            attributes: ['id', 'name', 'price'],            
            include: {
                model: Restaurant,
                //where: { id: Meal.restaurantId },
                attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
            }
        }
    })

    res.status(200).json({
        status: 'success',
        data: { order }
    })
})

const updateOrder = catchAsync(async (req, res, next) => {
    const { order } = req

    await order.update({ status: 'completed' })

    res.status(200).json({
        status: 'success',
        order,
    })
})

const deletOrder = catchAsync(async (req, res, next) => {
    const { order } = req

    await order.update({ status: 'cancelled' })

    res.status(204).json({ status: 'success' })
})

module.exports = { createOrder, getOrder, updateOrder, deletOrder }