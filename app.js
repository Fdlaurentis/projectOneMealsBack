const express = require('express')

//Routers
const { userRouter } = require('./routes/user.route')
const { restaurantRouter } = require('./routes/restaurant.route')
const { reviewRoute } = require('./routes/reviews.route')
const { mealRoute } = require('./routes/meal.route')
const { orderRoute } = require('./routes/order.route')

const { globalErrorHandler } = require('./controllers/error.controller')

const app = express()

app.use(express.json())

//EndPoints

app.use('/api/v1/users', userRouter)

app.use('/api/v1/restaurants', restaurantRouter)

app.use('/api/v1/restaurants/review', reviewRoute)

app.use('/api/v1/meal', mealRoute)

app.use('/api/v1/order', orderRoute)

//app.use(globalErrorHandler)

app.all('*', ( req, res ) => {
    res.status(404).json({
        status: 'error',
        message: `${req.method} ${req.url} does not exist in our server`
    })
})

module.exports = { app }