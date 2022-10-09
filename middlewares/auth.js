
const config = require('config')

const jwt = require('jsonwebtoken')

function UserAuth(request,response,next){

    const token = request.header('Authorization')
    
        if (token !== undefined){
        
            jwt.verify(token, config.get('jwtprivatekey'),(err,authdata)=>{
            if (!err) next()
            else{
                console.log(err)
                response.status(401).send('Token not vaified')
                }
            })
            
        }

    
        else response.status(400).send('Access denied. NO token provided')

}


function AdminAuth(request,response,next){

    const token = request.header('Authorization')
    

        if (token !== undefined){
            
            const decode = jwt.decode(token,config.get('jwtprivatekey'))

            if (decode.isAdmin === true) next()
            else{
                response.status(401).send('Token not vaified')
                }
            }
            

    
        else response.status(400).send('Access denied. NO token provided')

}

module.exports = {
    UserAuth : UserAuth,
    AdminAuth : AdminAuth

}