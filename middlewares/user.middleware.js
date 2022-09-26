const { User } = require('../models/users.model')

const { catchAsync } = require('../utils/catchAsync.util')

const userExist = catchAsync( async (req, res, next) => {
    const { id } = req.params

    const user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: { id }
    })

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        })        
    }

    req.user = user
    next()

} )

module.exports = { userExist }