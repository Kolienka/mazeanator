const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, `${process.env.NODE_ENV}.env`)});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    
    FRONTEND_HOST: process.env.FRONTEND_HOST || 'localhost',
    FRONTEND_PORT: process.env.FRONTEND_PORT || 3001
};