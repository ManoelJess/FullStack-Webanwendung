import express from 'express';
import { getAllCustomers, getCustomer, getCustomerRevenue, getMOCustomer, getNRCustomer } from '../controllers/customerController';



const customerRoutes = express.Router();


customerRoutes.get('/best',getNRCustomer);
customerRoutes.get('/customerRevenue',getCustomerRevenue);
customerRoutes.get('/mostOrder',getMOCustomer);
customerRoutes.get('/:customerId',getCustomer);
customerRoutes.get('/',getAllCustomers);



export default customerRoutes;