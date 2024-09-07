
import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.routes.js';

const app = express();
app.use(express.json()); // allows us to accept json data from the req body 
app.use('/api/products' , productRoutes);



app.listen(3000, () => {
    connectDB();
    console.log(' server started at port 3000 ');
});







// gCjuJPsM8uoppCWa
