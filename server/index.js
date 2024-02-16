const express=require('express')
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const cors=require('cors')

// importing models 
const userModel=require('./models/userModel')
const foodModel=require('./models/foodModel')
const verifyToken=require('./middleware/verifyToken')
const trackingModel=require("./models/trackingModel")


// database connection 

mongoose.connect('mongodb://localhost:27017/nutrify')
.then(()=>{
    console.log("connected to the database")
})
.catch((err)=>{
    console.log(err)
})

const app=express();

//middleware

app.use(express.json());

// endpoints for registering user

app.use(cors());

app.post("/register",(req,res)=>{
 
    let user=req.body;

    bcrypt.genSalt(10,(err,salt)=>{
        if(!err){
            bcrypt.hash(user.password,salt,async (err,hpass)=>{
                user.password=hpass;
                try
                {
                    let doc=await userModel.create(user)
                    res.status(201).send({message:"User Registered"})
                }
                catch(err)
                {
                    console.log(err);
                    res.status(500).send({message:"Some Problem"})
                }
            })
        }
    })

})

// endpoint for login

app.post("/login",async (req,res)=>{
 
    let userCred=req.body;
    try
    {

        const user= await userModel.findOne({email:userCred.email})
        if(user!==null)
        {
            bcrypt.compare(userCred.password,user.password,(err,success)=>{
                if(success==true)
                {
                    jwt.sign({email:userCred.email},"nutrify",(err,token)=>{
                        if(!err)
                        {
                            res.send({message:"Login Success",token:token,userid:user._id,name:user.name});
                        }
                        else
                        {
                            res.status(500).send({message:"Some issue while creating Token"})  
                        }
                    })
                }
                else
                {
                    res.status(403).send({message:"Incorrect Password"})
                }
            })
        }
        else
        {
            res.status(404).send({message:"User Not Found"})
        }

    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message:"Some Problem"})
    }
    

})


// endpoint to see all foods

app.get("/foods",verifyToken,async (req,res)=>{
    try
    {
        let food =await foodModel.find() 
        res.send(food);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message:"some problem"})
    }
})

// app.put('/update/:id' ,async (req,res)=>{
//     try{
//         const id= req.body._id;
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// })


// endpoint to search food by name 

app.get("/foods/:name",verifyToken,async (req,res)=>{

    try
    {
        let foods =await foodModel.find({name:{$regex:req.params.name,$options:"i"}})
        if(foods.length!=0)
        {
            res.send(foods)
        }
        else
        {
            res.status(404).send({message:"Food item Not Found"})
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message:"some problem happens"})
    }

})



//endpoint tracking

app.post("/track",verifyToken,async(req,res)=>{

    let trackData=req.body;

    try
    {
        let data=await trackingModel.create(trackData)
        res.status(201).send({message:"Food Added Successfully"})

    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message:"Some problem in Tracking"})
    }


})

// endpoint to fetch all foods eaten by a person

app.get("/track/:userId/:date",verifyToken,async(req,res)=>{

    let userId=req.params.userId;
    let date=new Date(req.params.date).toLocaleDateString();

    try
    {
        let foods=await trackingModel.find({userId:userId,eatenDate:date}).populate('userId').populate('foodId')
        res.send(foods)
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message:"Some problem in Tracking fetch"})
    }

})


app.listen(8000,()=>{
    console.log("server is running");
})