
const config = require('config')
const mongos_creds = config.get('mongos_creds');
module.exports = {

    MongoURI : `mongodb+srv://${mongos_creds}@cluster0.cf58p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

}