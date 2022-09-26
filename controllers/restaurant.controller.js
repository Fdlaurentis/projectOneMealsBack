const { Restaurant } = require('../models/restaurants.model')
const { Review } = require('../models/reviews.model')
const { User } = require('../models/users.model')

const { catchAsync } = require('../utils/catchAsync.util')

const getAllRestaurant = catchAsync( async (req, res, next) => {
    const restaurant = await Restaurant.findAll({
        where: { status: 'active' },
        attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
        include: [
            {
                model: Review,                
                attributes: ['id', 'comment', 'rating'],
                include: {
                    model: User,
                    where: { status: 'active' },
                    attributes: ['id', 'name']
                }
            }
        ]
    })
    res.status(200).json({
        status: 'success',
        data: {
            restaurant
        }
    })
} )

const getRestaurant = catchAsync( async(req, res, next) => {
    
    const { id } = req.restaurants

    const restaurant = await Restaurant.findOne({
        where: { id, status: 'active' },
        attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
        include: [
            {
                model: Review,                
                attributes: ['id', 'comment', 'rating'],
                include: {
                    model: User,
                    where: { status: 'active' },
                    attributes: ['id', 'name']
                }
            }
        ]
    })
    res.status(200).json({
        status: 'success',
        data: {
            restaurant
        }
    })
})

const createRestaurant = catchAsync( async (req,res,next) => {
    const { name, address, rating } = req.body
    const { sessionUser } = req

    const newRestaurant = await Restaurant.create({
        name, 
        address, 
        rating,
        userId: sessionUser.id
    })

    res.status(201).json({
        status: 'success',
        data: { newRestaurant }
    })

} )


const updateRestaurant = catchAsync( async (req, res, next) => {    
    const { name, address } = req.body
    const { restaurants } = req

    await restaurants.update({ name, address })

    res.status(200).json({
        status: 'success',
        data: { restaurants }
    })
})

const deleteRestaurant = catchAsync( async (req, res, next) => {
    const { restaurants } = req

    await restaurants.update({ status: 'deleted' })

    res.status(200).json({
        status: 'success',
        message: `The restaurant ${restaurants.name} has been deleted`
    })

    next()
})

module.exports = { 
    getAllRestaurant,
    getRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
}