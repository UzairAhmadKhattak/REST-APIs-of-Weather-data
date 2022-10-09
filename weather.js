//////////////////////////   Weather APIS for mobile app it will contain following things   /////////////////////////////

                                        //###   precipitation: 4%   ###//
                                        //###   humidity: 56%   ###//
                                        //###   wind: 16 km/h   ###//
                                        //###   temprature   ###//

const express = require('express')

const mongoose = require('mongoose')

const config = require('config')

if (!config.get('jwtprivatekey')){
    console.log("FATAL ERROR: jwtprivatekey is not defined")
    process.exit(1)
}

const app = express()

const imported_weather_route = require('./Routes/weather_route')

const improted_user_route = require('./Routes/user_route')

app.use(express.json())


db = require('./config/keys').MongoURI


app.use(improted_user_route)

app.use(imported_weather_route)


// database connection
const port = process.env.PORT || 5000
mongoose.connect(db, { useNewUrlParser:true })
.then(()=>{
    app.listen(port,()=> console.log(`Listening at port ${port}...`))
    console.log('db connected')
    
})
.catch((err)=>console.log(err))




