
import express from 'express';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

const app = express();
app.get('/', (req, res) => {
    res.send('hello sweetie how are you ');
})
app.use(express.json()); // allows us to accept json data from the req body 

app.get('/api/products', async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data: products
        })
    }   
    catch(err){
       console.log(error , " error in fetching products ");
    } 
})

app.post('/api/products', async (req, res) => {
    const product = req.body; // user will send this data 
    if (!product.name || !product.price || !product.image) {
        return res.status(422).json({ error: "please add all the fields" });
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        return res.status(201).json({
            success: true,
            data: newProduct
        })
    } catch (err) {
        console.log("error in create product ", err);
        return res.status(500).json({
            success: false,
            error: err,
            message: "something went wrong in server "
        })
    }
})

app.delete('/api/products/:id' , async(req,res)=>{
    const {id} = req.params
    console.log(id);
    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "product deleted successfully"
        })
    } catch (err) {
        console.log("error in delete product ", err);
        return res.status(500).json({
            success: false,
            error: err,
            message: "something went wrong in server "
        })
    }
})

app.listen(3000, () => {
    connectDB();
    console.log(' server started at port 3000 ');
});







// gCjuJPsM8uoppCWa
