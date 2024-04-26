const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Car = require('./cars'); // Import the Car model

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/showrrom';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');

    // Create an array of objects
    
    const carsData = [
        { carname: 'Honda Civic', carmodel: 'Sport', price: 24000, photoUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.carwale.com%2Fhonda-cars%2Fcivic%2Fimages%2F&psig=AOvVaw2JHqMgDgpNzcTjTu0IQbnK&ust=1714130053538000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOD9qZme3YUDFQAAAAAdAAAAABAE" },
        { carname: 'Toyota Corolla Hatchback', carmodel: 'SE Nightshade', price: 23000, photoUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.motortrend.com%2Freviews%2F2021-toyota-corolla-hatchback-manual-first-test-review%2F&psig=AOvVaw3FrIODv95KI0pWJLL2pw1_&ust=1714130093047000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJj396ye3YUDFQAAAAAdAAAAABAE" },
        { carname: 'Volkswagen Golf', carmodel: 'SE', price: 25000, photoUrl: "https://media.istockphoto.com/id/458296913/photo/volkswagen-golf-vii.jpg?s=612x612&w=0&k=20&c=b8t8dTuRcj9QUbDKjdTalAV2QEULmErliSf1A9FSOac=" },
        { carname: 'Hyundai Elantra GT', carmodel: 'N Line', price: 26000, photoUrl: "https://www.carandbike.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fcar-images%2Fgallery%2Fhyundai%2Felantra%2Fexterior%2Fhyundai_elantra-backview.jpg%3Fv%3D2019-10-03&w=640&q=75" },
        { carname: 'Kia Soul', carmodel: 'X-Line', price: 24000, photoUrl: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Kia/Kia-Soul/6223/1551075561697/front-left-side-47.jpg" },
        { carname: 'Mazda3 Hatchback', carmodel: 'Premium', price: 25500, photoUrl: "https://www.shutterstock.com/image-photo/novosibirsk-russia-september-30-2019-260nw-1519869284.jpg" },
        { carname: 'Ford Fiesta', carmodel: 'SE', price: 23500, photoUrl: "https://www.shutterstock.com/image-photo/nokia-finland-july-25-2019-260nw-1496861315.jpg" },
        { carname: 'Chevrolet Spark', carmodel: '1LT', price: 22000, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCPOseZsirWpxVZyxbnetJIVoGnpkIa_PmWuFPXxa4Hw&s" },
        { carname: 'Nissan Versa Note', carmodel: 'SR', price: 22500, photoUrl: "https://media.gettyimages.com/id/159527855/photo/the-nissan-versa-note-is-introduced-at-the-2013-north-american-international-auto-show-in.jpg?s=612x612&w=gi&k=20&c=IziLPUCqUvOv2CoqukQqbo44ZyGXYZ-TVdTvbNbKOpk=" }
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
    const port = 3000;
    app.listen(port, async () => {
        try {
            console.log('Server is running on port', port);
            await insertCars('Hatchback'); // Insert XUV cars when the server starts
        } catch (error) {
            console.error('Error starting server:', error);
        }
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
