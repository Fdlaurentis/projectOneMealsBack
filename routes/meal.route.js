const express = require('express')

const {
    createMeal,
    getAllMeal,
    getMeal,
    updateMeal,
    deleteMeal
} = require('../controllers/meal.controller')

const {
    mealExists
} = require('../middlewares/meal.middleware')

const {
    restaurantsExists
} = require('../middlewares/restaurants.middleware')

const {
    createMealValidator
} = require('../middlewares/validators.middleware')

const {
    protectSession,
    protectAdmin
} = require('../middlewares/auth.middleware')

const mealRoute = express.Router()

mealRoute.get('/', getAllMeal)

mealRoute.get('/:id', mealExists, getMeal)

mealRoute.use(protectSession)

mealRoute.post('/:id', restaurantsExists, protectAdmin, createMealValidator, createMeal)

mealRoute.patch('/:id', mealExists, protectAdmin, createMealValidator, updateMeal)

mealRoute.delete('/:id', mealExists, protectAdmin, deleteMeal)

module.exports = { mealRoute }