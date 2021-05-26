const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20 + 10);
        const camp = new Campground({
            author: '60838580430f3e583c030caa',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum ea veniam dicta odit, unde eos dolor dolorem cum rem reprehenderit earum eius, voluptatem tempore voluptate non perferendis. Eum, quisquam.',
            price,
            geometry: {
                type: 'Point',
                coordinates:[-113.1331, 47.0202]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dxbouoiqv/image/upload/v1621669005/YelpCamp/ypzphsoq1hlilmvkeyr9.jpg',    
                    filename: 'YelpCamp/ypzphsoq1hlilmvkeyr9'
                 },
                {
                     url: 'https://res.cloudinary.com/dxbouoiqv/image/upload/v1621669005/YelpCamp/tqojgwp4jvjmxhobcotk.jpg',    
                    filename: 'YelpCamp/tqojgwp4jvjmxhobcotk'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})