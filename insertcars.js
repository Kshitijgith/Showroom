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
        { carname: 'Honda Civic', carmodel: 'Sport', price: 24000, photoUrl: "https://www.financialexpress.com/wp-content/uploads/2021/10/2022-Honda-Intergra-Front-3-Quarters.jpg?w=1024" },
        { carname: 'Toyota Corolla Hatchback', carmodel: 'SE Nightshade', price: 23000, photoUrl: "https://media.ed.edmunds-media.com/toyota/corolla/2023/oem/2023_toyota_corolla_sedan_xse_fq_oem_1_1280.jpg" },
        { carname: ' maruti ciaz', carmodel: 'ZXI', price: 25000, photoUrl: "https://imgd.aeplcdn.com/1200x900/n/cw/ec/48542/ciaz-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80" },
        { carname: 'Hyndai Verna', carmodel: 'N Line', price: 26000, photoUrl: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Verna/9744/1694602806760/front-left-side-47.jpg" },
        { carname: 'suzuki dzire', carmodel: 'X-Line', price: 24000, photoUrl: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Kia/Kia-Soul/6223/1551075561697/front-left-side-47.jpg" },
        { carname: 'bmw 7 series', carmodel: 'Premium', price: 25500, photoUrl: "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/ExtraImages/20230106025629_P90486165_highRes_the_new_bmw_760i_xdr.jpg&w=726&h=482&q=75&c=1" },
        { carname: 'mercedies benz', carmodel: 'SE', price: 23500, photoUrl: "https://spn-sta.spinny.com/blog/20230501165604/image-9.png?compress=true&quality=80&w=1200&dpr=2.6" },
        { carname: 'volkswagon virtuso', carmodel: '1LT', price: 22000, photoUrl: "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/Galleries/20220308030907_Virtus_2022%20_1_.jpg" },
        { carname: 'skoda slavia', carmodel: 'SR', price: 22500, photoUrl: "" }
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
            await insertCars('Sedan'); // Insert XUV cars when the server starts
        } catch (error) {
            console.error('Error starting server:', error);
        }
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
