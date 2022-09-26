const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const { User } = require('../models/users.model')

const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

dotenv.config({ path: './config.env' })


//Crear Usuario
const createUser = catchAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body

    if (role !== 'admin' && role !== 'normal') {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid role'
        })
    }

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    })

    newUser.password = undefined

    res.status(201).json({
        status: 'success',
        data: { newUser }
    })
})

//Login
const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body 

    const user = await User.findOne({
        where: { email, status: 'active' }
    })

    if (!user || !(await bcrypt.compare(password, user.password))){
        return next(new AppError('Wrong credentials', 400))
    }

    user.password = undefined

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: '1h'})

    res.status(200).json({
        status: 'success',
        data: { user, token }
    })

})

//Actualizar Usuario
const updateUser = catchAsync( async (req, res) => {
    const { name, email } = req.body
    const { user } = req

    await user.update({ name, email })

    res.status(200).json({
        status: 'success',
        data: { user }
    })
})

//Eliminar Usuario
const deleteUser = catchAsync( async (req, res, next) => {    
    const { user } = req

    await user.update({ status: 'deleted' })

    res.status(200).json({ 
        status: 'success' ,
        message: `The user ${user.name} has been deleted`
    });

    next()
})

module.exports = {    
    createUser,
    login,
    updateUser,
    deleteUser
}