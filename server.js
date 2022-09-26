const { app } = require('./app')
const dotenv = require('dotenv')
dotenv.config( { path: ('./config.env') } )

const { initModels } = require('./models/initModels')
const { db } = require('./utils/db.util')

const startServer =  async () => {
    try {

        await db.authenticate()

        initModels()

        await db.sync()

        const PORT = process.env.PORT || 4000
        app.listen( PORT, () => {
            console.log(`Express run on Port: ${PORT}`);
        })
        
    } catch (error) {
        console.log(error);
    }
}

startServer()