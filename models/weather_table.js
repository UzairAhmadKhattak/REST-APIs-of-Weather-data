const mongoose = require('mongoose')

const weather_data_Schema = new mongoose.Schema({
day :{ 
    type: 'string',
    required: true
},
precipitation :{ 
    type: 'string',
    required: true
},
humidity : { 
    type: 'string',
    required: true
},
wind : { 
    type: 'string',
    required: true
},
temprature : { 
    type: 'string',
    required: true
}

})

const weather_table = mongoose.model('weather_table',weather_data_Schema)

module.exports = weather_table
