const mongoose =require('mongoose');
const usedcar=mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodel' // Assuming the model name for users is 'User'
    },
        carname:String,
        purchasedate:Date,
        price:Number,
        runningkilometres:Number,
        photo:String,
        
    
})
const usecar=mongoose.model('carsused',usedcar);
module.exports=usecar;