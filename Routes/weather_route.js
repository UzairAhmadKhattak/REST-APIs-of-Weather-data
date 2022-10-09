const Joi = require('joi')
const express = require('express')
const weather_table = require('../models/weather_table')
const Auth = require('../middlewares/Auth')
const router_weather = express.Router()
jwt = require('jsonwebtoken')

router_weather.use(express.json())

// get all weather data
router_weather.get('/api/weather/',Auth.UserAuth,(request,response)=>{
    
        weather_table.find()
        .then((data)=>{
        response.send(data)
        })
        .catch((err)=>console.log(err))
    })
                
// get weather data of specific day 
router_weather.get('/api/weather/:day',Auth.UserAuth,(request,response)=>{
    
    weather_table.findOne({day:request.params.day})
    .then((item)=>{
        if (item) response.send(item)
        else response.status(404).send('weather of given day is not there')
    })
    .catch((err)=>{
        response.send(err)
    })

})


// post weather data

router_weather.post('/api/weather',Auth.AdminAuth,(request,response)=>{

    const schema = Joi.object( {
        day: Joi.string().required(),
        precipitation : Joi.string().required() ,
        humidity : Joi.string().required(),
        wind : Joi.string().required(),
        temprature : Joi.string().required()
    })
    const weather_item = {
       
        day : request.body.day,
        precipitation : request.body.precipitation,
        humidity : request.body.humidity,
        wind : request.body.wind,
        temprature : request.body.temprature 
    }
    
    const result = schema.validate(request.body)


    if(!result.error){
        
        weather_table.findOne({day:request.body.day})
        .then((item)=>{
            if (item) response.status(404).send('weather of given day is already there')

            else{
                const Newweather_table = new weather_table(weather_item)
                Newweather_table.save()
                .then(()=>console.log('data saved in database'))
                .catch((err)=> console.log('error in data saving') )
                response.send('data saved in database')

            }
        })
        .catch((err)=>console.log(err))

       
        
    
    }
    
    else{
        return response.status(400).send(result.error.details[0].message)
    }
    

})

// update weather data of specific day

router_weather.put('/api/weather/:day',Auth.AdminAuth,(request,response)=>{

    weather_table.findOne({day:request.params.day})
    .then((item)=>{
        if (!item) response.status(404).send('weather of given day is not there')
        else{

            const schema = Joi.object( {
                day : Joi.string().required(),
                precipitation : Joi.string().required(),
                humidity : Joi.string().required(),
                wind : Joi.string().required(),
                temprature : Joi.string().required()
            })
            
            const result = schema.validate(request.body)

            if(!result.error){
            
                weather_table.updateOne({day:request.params.day},{ 
                $set : {
                    day : request.body.day,
                    precipitation : request.body.precipitation,
                    humidity : request.body.humidity,
                    wind : request.body.wind,
                    temprature : request.body.temprature

                }
                })

                .then(()=>response.send('Weather of given day updated'))
                .catch((err)=> response.send(err))
    
            }
    
            else{
                return response.status(400).send(result.error.details[0].message)
                }
        }

    })

    .catch((err)=>console.log(err))
    
})


//delete start here

router_weather.delete('/api/weather/:day',Auth.AdminAuth,(request,response)=>{

    weather_table.findOne({day:request.params.day})
    .then((item)=>{
        if (!item) response.status(404).send('weather of given day is not there')

        else{
            weather_table.deleteOne({day:request.params.day})
            .then(()=>response.send('weather of given day is deleted'))
            .catch((err)=> response.send(err))
            }
    })
    .catch((err)=> console.log(err))
    
})

module.exports = router_weather

