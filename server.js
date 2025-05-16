const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const chalk = require('chalk');

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
app.use('/api', employeesRoutes);
app.use('/api', departmentsRoutes);
app.use('/api', productsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

// CONNECT TO MONGOOSE
mongoose.connect('mongodb://0.0.0.0:27017/companyDB', { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log(chalk.blue('Connected to the database'));
});
db.on('error', err => console.log('Error ' + err));

app.listen('8000', () => {
  console.log(chalk.green.bold('Server is running on port: ') + chalk.yellow.bold('8000'));
});
  



