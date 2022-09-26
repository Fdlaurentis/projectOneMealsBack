const express = require('express')

const {
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviews.controller')

const {
    restaurantsExists
} = require('../middlewares/restaurants.middleware')

const { 
    reviewExists 
} = require('../middlewares/review.middleware')

const { 
    createReviewValidator
} = require('../middlewares/validators.middleware')

const {
    protectSession,
    protectReview 
} = require('../middlewares/auth.middleware')

const reviewRoute = express.Router()

reviewRoute.use(protectSession)

reviewRoute.post('/:id', restaurantsExists, createReviewValidator, createReview )

reviewRoute.patch('/:id', reviewExists, protectReview, createReviewValidator, updateReview)

reviewRoute.delete('/:id', reviewExists, protectReview, deleteReview)

module.exports = { reviewRoute }