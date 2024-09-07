import express from 'express'
import { createProduct, deleteProduct, getProducts, updatedProduct } from '../controllers/product.controller';



const router = express.Router();
router.get('/', (req, res) => {
    res.send('hello sweetie how are you ');
})

router.get('/',getProducts ) ;

router.post('/', createProduct ) ;

router.delete('/' , deleteProduct );

router.put('/' , updatedProduct) ;

export default router;