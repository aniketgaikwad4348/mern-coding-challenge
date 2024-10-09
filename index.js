
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('./models/Product'); 
const productRoutes = require('./routes/productRoutes'); 


const app = express();


app.use(cors());
app.use(express.json());


const mongoURI = 'mongodb://localhost:27017/mern-coding-challenge'; 
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Hello, MERN Coding Challenge!');
});


app.get('/api/seed', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const products = response.data;

        
        console.log('Fetched products:', products);

        
        const formattedProducts = products.map(product => ({
            productId: `prod-${product.id}`,
            name: product.title,
            value: product.price,
            image: product.image 
        }));

        
        await Product.deleteMany({});
        await Product.insertMany(formattedProducts);

        res.status(200).json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.error('Error seeding database:', error); 
        res.status(500).json({ message: 'Error seeding database', error });
    }
});


app.use('/api/products', productRoutes);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
