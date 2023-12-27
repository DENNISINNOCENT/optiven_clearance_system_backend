const jwt = require('../auth/authJwt')
const authenticateToken = (req,res,next) =>{
    const token = req.header('Authorization');
    if(!token){
        res.status(401).json({
            message:"unauthorized -missing token"
        })

    }
    try{
        const decoded = jwt.verifyToken(token);
        req.user = decoded
        next();
    }catch(err){
        res.status(403).json({
            message:'Forbidden - Invalid token'
        })

    }
}
module.exports = authenticateToken