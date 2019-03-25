const express = require('express');
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const cors = require('cors')


const app = express();

app.use(cors())

//Environtment Variables
require('dotenv').config()

//Connect to Database
require("./config/db");

autoIncrement.initialize(mongoose.connection)

app.use(express.json());

app.use('/api/v1/transactions', require('./routes/transactions'))
app.use('/api/v1/details', require('./routes/details'))
app.use('/api/v1/services', require('./routes/services'))

const PORT = process.env.PORT || 3002;
app.listen(PORT, console.log(`Server started on Port ${PORT}`))