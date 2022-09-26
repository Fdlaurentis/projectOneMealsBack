const { body, validationResult } = require('express-validator')

const checkValidation = (req, res, next) => {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        const errorMessage = error.array().map(err => err.msg)

        const message = errorMessage.join('. ')

        return res.status(400).json({
            status: 'error',
            message
        })
    }
    next()
}

const createUserValidator = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters'),
    body('email')
        .isEmail()
        .withMessage('Must provide a valid email'),
    body('password')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Name must be at least 3 characters'),
    checkValidation
]

const createRestaurantValidator = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters'),
    body('address')
        .isString()
        .withMessage('Address must be a string')
        .notEmpty()
        .withMessage('Address cannot be empty')
        .isLength({ min: 10 })
        .withMessage('Adress must be at least 10 characters'),
    body('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be a integer from 1 to 5')
        .notEmpty()
        .withMessage('Rating cannot be empty'),
    checkValidation
]

const createReviewValidator = [
    body('comment')
        .isString()
        .withMessage('Comment must be a string')
        .notEmpty()
        .withMessage('Comment cannot be empty')
        .isLength({ min: 10 })
        .withMessage('Comment must be at least 10 characters'),
    body('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be a integer from 1 to 5')
        .notEmpty()
        .withMessage('Rating cannot be empty'),
    checkValidation
]

const createMealValidator = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 5 })
        .withMessage('Name must be at least 5 characters'),
    body('price')
        .isNumeric()
        .withMessage('Price must be a integer')
        .notEmpty()
        .withMessage('Price cannot be empty'),
    checkValidation
]

const createOrderValidator = [
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be a integer.')
        .notEmpty()
        .withMessage('Quantity cannot be empty'),
    body('mealId')
        .isInt({ min: 1 })
        .withMessage('MealId must be a integer.')
        .notEmpty()
        .withMessage('MealId cannot be empty'),
    checkValidation
]

module.exports = {
    createUserValidator,
    createRestaurantValidator,
    createReviewValidator,
    createMealValidator,
    createOrderValidator
}