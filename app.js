const express = require('express');
const bodyParser = require('body-parser');
const pesananRoutes = require('./routes/pesanan_route');
const pelangganRoutes = require('./routes/pelanggan_route');
const sequelize = require('./config/database'); // Pastikan path ini benar

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', pesananRoutes);
app.use('/api', pelangganRoutes);

// sequelize.sync() // Sinkronisasi model dengan database
//   .then(() => {
//     console.log('Database connected and synchronized');
//     app.listen(port, () => {
//       console.log(`Server is running on http://localhost:${port}`);
//     });
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

module.exports = app;
