const { db, DataTypes } = require('../utils/db.util')

const Review = db.define('review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },    
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
})

module.exports = { Review }