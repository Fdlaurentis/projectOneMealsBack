const { Restaurant } = require('../models/restaurants.model')

const { catchAsync } = require('../utils/catchAsync.util')

const restaurantsExists = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const restaurants = await Restaurant.findOne( { where: { id } })
    if (!restaurants){
        return res.status(404).json({
            status: 'error',
            message: 'Restaurants not found'
        })
    }

    req.restaurants = restaurants
    next()
})

module.exports = { restaurantsExists }