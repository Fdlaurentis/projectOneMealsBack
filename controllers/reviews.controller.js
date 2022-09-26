const { Review } = require('../models/reviews.model')

const { catchAsync } = require('../utils/catchAsync.util')

const createReview = catchAsync( async(req, res, next) => {
    const { restaurants } = req

    const userId = req.sessionUser.id

    const { comment, rating } = req.body

    const newReview = await Review.create({
        restaurantId : restaurants.id,
        userId,
        comment,
        rating
    })

    res.status(200).json({
        status: 'success',
        data:{ newReview }
    })
})

const updateReview = catchAsync( async(req, res, next) => {
    const { comment, rating } = req.body
    const { review } = req

    await review.update( { comment, rating } )

    res.status(200).json({
        status: 'success',
        data: { review }
    })
})

const deleteReview = catchAsync( async(req, res, next) => {
    const { review } = req

    await review.update({ status: 'deleted' })

    res.status(200).json({
        status: 'success',
        message: `The review has been deleted`
    })

    next()
})

module.exports = { createReview, updateReview, deleteReview }