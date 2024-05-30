// const { Sequelize } = require('sequelize');
// const dotenv = require('dotenv');

// // Load environment variables from .env file
// dotenv.config();

// const {
//     PORT,
//     DB_HOST,
//     DB_USER,
//     DB_PASS,
//     DB_NAME,
//     DB_DIALECT
// }=process.env

// // Configure connection to MySQL database
// const sequelize = new Sequelize(DB_NAME, DB_USER, {
//     host: DB_HOST,
//     dialect:DB_DIALECT,
//     logging: false
// });

// // Connect to the database
// sequelize.authenticate()
//     .then(() => {
//         console.log('Connected to the MySQL database');
//     })
//     .catch(err => {
//         console.error('Error connecting to the database:', err);
//     });

// module.exports = sequelize;

