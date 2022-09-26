const { Meal } = require('../models/meals.model')
const { Restaurant } = require('../models/restaurants.model')

const { catchAsync } = require('../utils/catchAsync.util')

const createMeal = catchAsync(async (req, res, next) => {
    const { restaurants } = req

    const { name, price } = req.body

    const newMeal = await Meal.create({
        restaurantId: restaurants.id,
        name,
        price
    })

    newMeal.orderId = undefined

    res.status(200).json({
        status: 'success',
        data: { newMeal }
    })
})

const getAllMeal = catchAsync(async (req, res, next) => {
    const meal = await Meal.findAll({
        where: { status: 'active' },
        attributes: { exclude: ['orderId', 'status', 'createdAt', 'updatedAt'] },
        include: {
            model: Restaurant,
            where: { status: 'active' },
            attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
        }
    })

    res.status(200).json({
        status: 'success',
        data: { meal }
    })
})

const getMeal = catchAsync(async (req, res, next) => {
    const { id } = req.meal

    const meal = await Meal.findOne({
        where: { id, status: 'active' },
        attributes: { exclude: ['orderId', 'status', 'createdAt', 'updatedAt'] },
        include: {
            model: Restaurant,
            where: { status: 'active' },
            attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
        }
    })

    res.status(200).json({
        status: 'success',
        data: { meal }
    })
})

const updateMeal = catchAsync(async (req, res, next) => {
    const { name, price } = req.body
    const { meal } = req

    await meal.update({ name, price })

    meal.orderId = undefined

    res.status(200).json({
        status: 'success',
        data: { meal }
    })
})

const deleteMeal = catchAsync(async (req, res, next) => {
    const { meal } = req

    await meal.update({ status: 'disabled' })

    res.status(200).json({
        status: 'success',
        message: `The meal ${meal.name} has been disabled`
    })

    next()
})

module.exports = {
    createMeal,
    getAllMeal,
    getMeal,
    updateMeal,
    deleteMeal
}