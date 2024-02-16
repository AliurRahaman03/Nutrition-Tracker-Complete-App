const jwt=require('jsonwebtoken')

function verifyToken(req,res,next)
{
    if(req.headers.authorization!==undefined)
    {
        let token =req.headers.authorization.split(" ")[1];

        jwt.verify(token,"nutrify",(err,data)=>{
            if(!err)
            {
                next()
            }
            else
            {
                res.status(401).send({message:"Invalid Token"})
            }
        })
    }
    else
    {
        res.status(401).send({message:"Please Send a token"})
    }
}

module.exports=verifyToken;