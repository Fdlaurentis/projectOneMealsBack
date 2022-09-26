const { Meal } = require('../models/meals.model')

const { catchAsync } = require('../utils/catchAsync.util')

const mealExists = catchAsync(  async(req, res, next) =>{
    const { id } = req.params
    const meal = await Meal.findOne( { where: { id } } )

    if (!meal){
        return res.status(404).json({
            status: 'error',
            message: 'Meal not found'
        })
    }

    req.meal = meal
    next()

})

module.exports = { mealExists }