import express from 'express';
import { getOrder, getOrders } from '../controllers/orderController';

const orderRoutes = express.Router();


orderRoutes.get('/',getOrders)
orderRoutes.get('/:orderId',getOrder)


export default orderRoutes;