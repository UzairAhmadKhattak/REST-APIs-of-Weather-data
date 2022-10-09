const mongoose = require('mongoose')

const User_Schema = new mongoose.Schema({
name :{ 
    type: 'string',
    required: true
},
email :{ 
    type: 'string',
    unique:true,
    required: true
},
password : { 
    type: 'string',
    required: true
},

isAdmin : {Boolean}

})

const User_table = mongoose.model('User_table',User_Schema)

module.exports = User_table
