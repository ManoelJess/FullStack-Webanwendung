import express from 'express';
import { monthRevenue, nextYearRevenue, totalRevenue, yearRevenue } from '../controllers/orderController';


const revenueRoutes = express.Router();

revenueRoutes.get('/',totalRevenue)
revenueRoutes.get('/month',monthRevenue)
revenueRoutes.get('/year',yearRevenue)
revenueRoutes.get('/year/next',nextYearRevenue)






export default revenueRoutes;