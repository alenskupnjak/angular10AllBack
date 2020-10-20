const chalk = require('chalk');
const exppres = require('express');
// const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Definicija baze i Import

const app = exppres();

const routes = require('./config/routes');

// manage your ENV varijable
const dotenv = require('dotenv');
// definiramo path za file u koji spremamo potrebne varijable
dotenv.config({ path: '.vscode/config.env' });



// Spajanje na bazu
connectDB();

// Custom Middlevhere
app.use((req, res, next) => {
  console.log(chalk.blue.bgRed.bold('START START START'));
  // const error = new Error('Not found');
  // error.message = 'Invalid route';
  // error.status = 404;
  // next(error);
  next();
});

////
// za primjer
app.post('/', (req, res) => {
  res.send('Primjer');
});

// aplikacija API
app.use('/appinvoice', routes);

// definiranje porta
const PORT = process.env.PORT || 3001;

// Pozdravna poruka
app.get('/', (req, res) => {
  res.json({ msg: 'Pozdrav. Ovo je Aplikacija Invoice' });
});

app.get('/pozdrav', (req, res) => {
  res.json({ msg: 'Dobro došli jos jednom' });
});

app.listen(PORT, () => {
  console.log('Server is running on port - ' + PORT);
});
