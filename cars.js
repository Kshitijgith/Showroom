const mongoose = require('mongoose');

// Define the car schema
const carSchema = mongoose.Schema({
    
    XUV: [{
        carname: String,
        carmodel: String,
        photoUrl: String,
        price: String
    }],
    Sedan: [{
        carname: String,
        carmodel: String,
        photoUrl: String,
        price: String
    }],
    Hatchback: [{
        carname: String,
        carmodel: String,
        photoUrl: String,
        price: String
    }],
    SUV: [{
        carname: String,
        carmodel: String,
        photoUrl: String,
        price: String
    }
],
    
});
// Create the Car model
const Car = mongoose.model('Car', carSchema);

module.exports = Car;
