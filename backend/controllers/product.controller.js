import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
   
        try{
            const products = await Product.find({});
            res.status(200).json({
                success: true,
                data: products
            })
        }   
        catch(err){
           console.log(err , " error in fetching products ");
        } 
    
}

export const createProduct = async (req, res) => {
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
}


export const deleteProduct =async(req,res)=>{
    const {id} = req.params
    console.log(id);
    if( ! mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
          success: false,
          message:"invalid id"
        })   
      }
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
}

export const updatedProduct = async(req,res)=>{
    const {id} = req.params  
    const product = req.body;
    if( ! mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success: false,
        message:"invalid id"
      })   
    }
    try {
       const updatedProduct  = await Product.findByIdAndUpdate(id , product,{new:true});
        return res.status(200).json({
            success: true,
            message: "product updated successfully",
             data: updatedProduct
        })
    } catch (err) {
        console.log("error in update product ", err);
        return res.status(500).json({
            success: false,
            error: err,
            message: "something went wrong in server "
        })
    }
}