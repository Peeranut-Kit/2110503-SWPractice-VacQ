const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

//Route files
const hospitals = require('./routes/hospitals');
const appointments = require('./routes/appointments');
const auth = require('./routes/auth');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

//Rate Limiter
const limiter = rateLimit({
    windowsMs: 10*60*1000, //10 mins
    max: 100
});

const app = express();
app.use(cors()); //Enable CORS
app.use(express.json()); //Body parser
app.use(cookieParser()); //Cookie parser
app.use(mongoSanitize()); //Sanitize data
app.use(helmet()); //Set security headers
app.use(xss()); //Prevent XSS attacks
app.use(limiter); //Rate Limiting
app.use(hpp()); //Prevent http param pollutions

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
app.use('/api/v1/appointments', appointments);
app.use('/api/v1/auth', auth);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`);
    //Close sever & exit process
    server.close(()=>process.exit(1));
})