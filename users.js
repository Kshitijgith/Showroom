const mongoose=require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL);
const userschema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    Services:[{
        Service:String,
        CarModel:String,
        CarNo:String,
        Bookingdate:Date,
        PaymentOption:String,
        carsell:mongoose.Schema.Types.ObjectId,
    }],
        
        
    
        
       
       
    
    
    

})
const usermodel= mongoose.model('userdetails',userschema);
module.exports=usermodel;