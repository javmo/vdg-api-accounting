// dotenv levanta las vartaibles de .env
if(process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./services/logger');

const { swaggerUi, swaggerSpec } = require('../swaggerConfig');

// Initializations
const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());


// routes

/*
app.use('/api/account', require('./routes/account.routes'));
app.use('/api/wallet', require('./routes/wallet.routes'));
app.use('/api/owner', require('./routes/owner.routes'));
app.use('/api/exchange', require('./routes/exchange.routes'));
app.use('/api/account', require('./routes/account.routes'));
*/
app.use('/api/account', require('./routes/account.routes'));
// swagger routes
logger.info(`📋 Version 1 docs are available at http://localhost:${process.env.PORT || 3000}/api-docs`);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//app.use('/api-docs', require('./routes/api-docs'));



// static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;