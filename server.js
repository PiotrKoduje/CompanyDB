const express = require('express');
const cors = require('cors');
const mongoClient = require('mongodb').MongoClient;
const chalk = require('chalk');

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

// CONNECT DO MONGODB
mongoClient.connect('mongodb://0.0.0.0:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err){
    console.log(chalk.red(err));
  }
  else {
    console.log(chalk.green('Successfully connected to the database'));

    const db = client.db('companyDB');
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // MIDDLEWARE EXPOSING THE DB
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    app.use('/api', employeesRoutes);
    app.use('/api', departmentsRoutes);
    app.use('/api', productsRoutes);

    app.use((req, res) => {
      res.status(404).send({ message: 'Not found...' });
    })
    
    app.listen('8000', () => {
      console.log(chalk.green.bold('Server is running on port: ') + chalk.yellow.bold('8000'));
    });
  }
});


