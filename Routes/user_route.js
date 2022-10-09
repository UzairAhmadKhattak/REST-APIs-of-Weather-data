const jwt = require('jsonwebtoken')
const Joi = require('joi')
const express = require('express')
const User_table = require('../models/User_table')
const { request, response } = require('express')
const router_User = express.Router()
config = require('config')
router_User.use(express.json())

// user registeration 
router_User.post('/api/weather/User/register',(request,response) =>{

    const schema = Joi.object( {
        name: Joi.string().required(),
        password : Joi.string().required() ,
        email : Joi.string().email({ tlds: { allow: false } }).required()
    })
    const user_info = {
       
        name : request.header('name'),
        password : request.header('password'),
        email : request.header('email'),
    }
    

    const result = schema.validate(user_info)


    if(!result.error){
        
        User_table.findOne({email:request.body.email})
        .then((item)=>{
            if (item) response.status(404).send('email already there')

            else{
                const New_User_table = new User_table(user_info)
                New_User_table.save()
                .then(()=>console.log('User registered in database'))
                .catch((err)=> console.log('error in data saving') )
                response.send('User registered you can login now')

            }
        })
        .catch((err)=>console.log(err))
    
    }
    
    else{
        return response.status(400).send(result.error.details[0].message)
    }
})

// user login
router_User.post('/api/weather/User/login',(request,response)=>{

    email = request.header('email')
    password = request.header('password')

    User_table.findOne({email:email,password:password})
    .then((item)=>{
        if (item){
        // console.log(item)
        const token = jwt.sign({id : item.id},config.get('jwtprivatekey'))
        response.header('Authorization',token).send('correct crentials, token is set in header response you can request APIs with that token')
        
        } 

        else{
            response.send('invalid email or password')

        }
    })
    .catch((err)=>console.log(err))


})

// admin login
router_User.post('/api/weather/admin/login',(request,response)=>{

    email = request.body.email
    password = request.body.password

    User_table.findOne({email:email,password:password})
    .then((item)=>{
        if (item){
        console.log(item)
        const token = jwt.sign({email : item.email,isAdmin:item.isAdmin},config.get('jwtprivatekey'))
        response.header('Authorization',token).send('correct crentials')
        
        } 

        else{
            response.send('invalid email or password')

        }
    })
    .catch((err)=>console.log(err))


})




module.exports = router_User