const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Car = require('./cars'); // Import the Car model
require('dotenv').config()
// MongoDB connection string
const port=process.env.PORT
const connection=process.env.MONGO_URL
// Connect to MongoDB
mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');

    // Create an array of objects
    
    const carsData = [
        { carname: 'MG Hector', carmodel: 'N', price: 15000, photoUrl: "https://imgd-ct.aeplcdn.com/1056x660/n/cw/ec/142061/mg-hector-right-front-three-quarter7.jpeg?isig=0&wm=4&q=80" },
        { carname: 'Toyota Landcruser', carmodel: 'ZXi', price: 23000, photoUrl: "https://www.hdcarwallpapers.com/walls/toyota_land_cruiser_2021_5k-HD.jpg" },
        { carname: ' Mahindra Thar ', carmodel: 'ZXI', price: 25000, photoUrl: "https://imgd-ct.aeplcdn.com/1056x660/n/cw/ec/40087/thar-exterior-right-rear-three-quarter.jpeg?q=80" },
        { carname: 'Tata Safari', carmodel: 'N Line', price: 26000, photoUrl: "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/Galleries/20231009033910_Accomplished%20_%20Front%203_4th%20new.jpg&w=736&h=488&q=75&c=1" },
        { carname: 'BMW X1', carmodel: 'X-Line', price: 24000, photoUrl: "https://www.hdcarwallpapers.com/walls/2015_bmw_x1_xdrive_xline-wide.jpg" },
        { carname: 'Land Rover Defender', carmodel: 'Premium', price: 25500, photoUrl: "https://w0.peakpx.com/wallpaper/673/1001/HD-wallpaper-2022-land-rover-defender-v8-110-front-car.jpg" },
        { carname: 'Range Rover', carmodel: 'SE', price: 23500, photoUrl: "https://w0.peakpx.com/wallpaper/477/18/HD-wallpaper-range-rover-autobiography-2022.jpg" },
        { carname: 'Jeep Compass', carmodel: '1LT', price: 22000, photoUrl: "https://imgd-ct.aeplcdn.com/1056x660/n/cw/ec/47051/compass-exterior-left-front-three-quarter.jpeg?q=80" },
        { carname: 'Audi Q3', carmodel: 'SR', price: 22500, photoUrl: "https://c4.wallpaperflare.com/wallpaper/932/760/23/audi-q3-2-tfsi-2011-white-audi-suv-wallpaper-preview.jpg" }
    ];
    
    
    
    
    
    
        
    

    // Endpoint to upload cars
    async function insertCars(type) {
        try {
            // Check if a document already exists
            const existingObject = await Car.findOne();
            
            if (existingObject) {
                // If the document exists, push the new cars into its corresponding array
                for (let i = 0; i < carsData.length; i++) {
                    const car = carsData[i];
                    existingObject[type].push({
                        carname: car.carname,
                        carmodel: car.carmodel,
                        photoUrl: car.photoUrl,
                        price: car.price
                    });
                }
    
                // Save the updated document
                await existingObject.save();
            } else {
                // If the document doesn't exist, create a new one
                const newCarObject = {};
                newCarObject[type] = carsData;
                await Car.create(newCarObject);
            }
    
            console.log(`${type} cars uploaded successfully`);
        } catch (err) {
            console.error(`Error uploading ${type} cars:`, err);
            throw new Error('Internal server error');
        }
    }
    
    
    
    

    // Start the server and insert data when the server starts
    
    app.listen(port, async () => {
        try {
            console.log('Server is running on port', port);
            await insertCars('SUV'); // Insert XUV cars when the server starts
        } catch (error) {
            console.error('Error starting server:', error);
        }
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
