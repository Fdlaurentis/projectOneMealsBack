const express = require('express')

const {
    getAllRestaurant,
    getRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
} = require('../controllers/restaurant.controller')

const { restaurantsExists } = require('../middlewares/restaurants.middleware')

const {
    protectAdmin,
    protectSession
} = require('../middlewares/auth.middleware')

const {
    createRestaurantValidator
} = require('../middlewares/validators.middleware')

const restaurantRouter = express.Router()

restaurantRouter.get('/', getAllRestaurant)

restaurantRouter.get('/:id', restaurantsExists, getRestaurant)

restaurantRouter.use(protectSession)

restaurantRouter.post('/', protectAdmin, createRestaurantValidator, createRestaurant)

restaurantRouter.patch('/:id', restaurantsExists, protectAdmin, updateRestaurant)

restaurantRouter.delete('/:id', restaurantsExists, protectAdmin, deleteRestaurant)

module.exports = { restaurantRouter }