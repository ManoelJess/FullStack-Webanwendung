import express from 'express';
import productsRouter from './routes/productsRoutes';
import signUpRoute from './routes/signUpRoutes';
import client from './dataBase';
import customerRoutes from './routes/customerRoutes';
import { errorHandler } from './handler/errorHandler';
import orderRoutes from './routes/orderRoutes';
import revenueRoutes from './routes/revenueRoutes';
import bodyParser from 'body-parser';

client.connect();



const app = express();
const port = 3000;

app.listen(port,()=>{
    console.log(`Server is Fire at http://localhost:${port}`);
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,PUT,DELETE,GET');

        return res.status(200).json({});
    }
    next();
});



app.use('/products',productsRouter);
app.use('/orders',orderRoutes);
app.use('/revenues',revenueRoutes);
app.use('/customers',customerRoutes);
app.use('/singUp',signUpRoute);


app.use(errorHandler);
