const express=require('express');
const mongoose=require('mongoose');
const carss=require('./cars');
const cors=require('cors');
const userss=require('./users');
const bcrypt =require('bcrypt');
const saltrounds=10;
const app=express();
app.use(express.json());
app.use(cors());
let logedin=false;
const usedcar=require('./usedcars');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config()
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
console.log(port);

//below route is for signup
{
  app.post('/', (req, res) => {
    res.send("welcome");
  });
app.post('/register', async (req ,res)=>{
try{
const {email,password,username}=req.body;

const user=await userss.findOne({email});
const usrname=await userss.findOne({username});
if(usrname){
  return res.json("try another username");
}
if(user){
    return res.json("already registerd");
}
const hasedpassword=await  bcrypt.hash(password,saltrounds);
const newuser= await userss.create({email,password:hasedpassword});
res.json(newuser);
logedin=true;
}
catch(err){
res.status(500).json(err)
}
});
}


let loggedInUsername = ''//this variable is for checking user is loged in or not


//below route is for login
{   
app.post('/login',async (req,res)=>{
try{
   const {email,password}=req.body;
   const user=await userss.findOne({email});
   if(!user){
    return res.json("no user found");
   }
   const hashedpassword = String(user.password);
   const match = await  bcrypt.compare(password, hashedpassword);

   if(match){
     loggedInUsername = user.email;
     res.json("successful")
     logedin=true;
   }
   
   else{
    res.json("wrong password")
   }
   console.log(logedin);

}
catch(err){
res.status(500).json(err);
}
});
}


//below route is for updating a login stae when user logouts
{
app.post('/logout',async ()=>{
  try{
    logedin=false;
    
  }
  catch(error){
res.send(error);
  }
  
  
})
}


//below route is for adding different services
{
app.post('/service',async (req,res)=>{
  try{
    if(logedin===false){
       return res.json("login")
    }
    const user= await userss.findOne({email:loggedInUsername});
    if(!user){
      res.json("no user exists");

    }
    else{

      const newService = {
        Service: req.body.Service,
        CarModel: req.body.CarModel,
        CarNo: req.body.CarNo,
        Bookingdate: req.body.Bookingdate,
        PaymentOption: req.body.PaymentOption
      };
      user.Services.push(newService);

   
    await user.save();
    res.json("booked")}
  }
  catch(err){
    res.status(500).json(err);
  }
})
}
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.post('/sellcar', async (req, res) => {
  try {
    if (!logedin) {
      return res.json("Login");
    }
    const user = await userss.findOne({ email: loggedInUsername });
    if (!user) {
      return res.json("User not found");
    }
    const used = await usedcar.create({
      carname: req.body.carname,
      price: req.body.price,
      
      runningkilometres: req.body.runningkilometres,
      userid: user.id,
      photo: req.body.photo
      // Store the base64 encoded image directly// photo: req.body.photo
       // Assuming the base64 encoded image is sent in the 'photo' field of the request body
    });
    
    user.carsell = used.id;
    await user.save();
    res.json("Used car created successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});



//this route is for showing cars to client from database
app.post('/cars', async (req, res) => {
  try {
     const{Type}=req.body;
    // const Type = req.body.type.toString();
   ;
    
     
    
     const jsonString = JSON.stringify(Type);
     console.log(typeof(jsonString));
     console.log(jsonString);
    const Car = await carss.find();
    const suvCars = Car[0].SUV;
    const Sedan=Car[0].Sedan;
    const  Hatchback=Car[0].Hatchback;
    const XUV=Car[0].XUV;
    
// Assuming Sedan, SUV, etc. are arrays containing car data of respective types

if (jsonString === '{"type":"Sedan"}') {
  res.json(Sedan); // Send response for Sedan cars
} else if (jsonString === '{"type":"SUV"}') {
  res.json(suvCars); // Send response for SUV cars
} else if (jsonString === '{"type":"Hatchback"}') {
  res.json(Hatchback); // Send response for Hatchback cars
} else if (jsonString === '{"type":"XUV"}') {
  res.json(XUV); // Send response for XUV cars
} else {
  // Handle other cases or invalid input
  res.status(400).json({ error: 'Invalid car type' });
}
    
} catch (error) {
    console.error('Error finding Hatchback cars:', error);
}
    
});


//this route is for showing usedcars from database to client
app.post('/usedcars', async (req, res) => {
  try {
    
    const Car = await usedcar.find();


    res.json(Car);
}
  
 catch (error) {
  console.error('Error finding used cars:', error);
  res.status(500).json({ error: 'Internal server error' });
}
    
});


//this route is basically sharing state of login to client to check user loged in or not
app.post('/state', async (req, res) => {
  try {
    

console.log(logedin);
    if(logedin){

      res.json({
        success:true,
        username:loggedInUsername
      });
      
     

    }
    if(!logedin){
      res.json({
        success:false,
        username:" "
      });
    }
      
    }
    catch (error) {
      console.error('Error finding used cars:', error);
      res.status(500).json({ error: 'Internal server error' });
    }});
    
   //below route is for showing userdetails to client
   app.post('/showservice',async(req,res)=>{
          const user=await userss.find({email:loggedInUsername})
   res.json(user);



   })

    //for running server
app.listen(port,()=>{
    console.log(`server is running `);
})
