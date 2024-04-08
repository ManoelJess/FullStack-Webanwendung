import express from 'express';
import { getProduct, getProducts } from '../controllers/productsController';

const productsRouter = express.Router();


productsRouter.get('/',getProducts);


productsRouter.get('/:productId',getProduct);


export default productsRouter;