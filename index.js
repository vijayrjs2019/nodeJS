const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();

const AuthRoute = require('./Routes/AuthRouter.js')

require('dotenv').config();

require('./Config/DB.js');

const Port = process.env.PORT || 8080;

app.get('/ping',(req,res)=>{
    res.send("Hello test");
});

app.use(bodyParser.json());
app.use(cors());

app.use('/auth',AuthRoute);

app.listen(Port,()=>{
        console.log(`Server run on ${Port}`)
});