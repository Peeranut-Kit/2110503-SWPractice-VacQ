const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Route files
const hospitals = require('./routes/hospitals');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

const app = express();
app.use(express.json()); //Body parser

/*app.get('/', (req,res) => {
    // res.send('<h1>Hello from express</h1>');
    // res.send({name:'Brad'});
    // res.json({name:'Brad'});
    // res.sendStatus(400);
    // res.status(400).json({success:false});
    res.status(200).json({status:true, data:{id:1}});
});*/

//Mount routers
app.use('/api/v1/hospitals', hospitals);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`);
    //Close sever & exit process
    server.close(()=>process.exit(1));
})