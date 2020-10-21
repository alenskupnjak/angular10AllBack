const chalk = require('chalk'); // boje consol.log....
const express = require('express');
const connectDB = require('./config/db'); // Definicija baze i Import
const morgan = require('morgan'); // ispisaianje na command liniji poruke...
const bodyParser = require('body-parser'); // Body parser, bez ovoga ne mozemo slati podatke u req.body
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');
const cors = require('cors');


// Inicijalizacija aplikacije
console.log(chalk.bold.green('START Aplikacija START'));
const app = express();

// Import routes
const routes = require('./config/routes');

// definiramo path za file u koji spremamo potrebne varijable
const dotenv = require('dotenv'); // manage your ENV varijable
dotenv.config({ path: '.vscode/config.env' });

// Spajanje na bazu
connectDB();

// Custom Middlevhere
app.use((req, res, next) => {
  console.log(chalk.blue.bgRed.bold('START Middlewhare'));
  // const error = new Error('Not found');
  // error.message = 'Invalid route';
  // error.status = 404;
  // next(error);
  next();
});

// SWAGGER
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, { explorer: true })
);

// Ispis vremena
app.use((req, res, next) => {
  console.log('Time: %d', Date.now());
  next();
});

// Enable CORS
app.use(cors());


// Dev logging middleware
//   'dev'   ,
// Concise output colored by response status for development use. The :status token will be colored green for success codes, red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for information codes.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //
}

// Body parser, bez ovoga ne mozemo slati podatke u req.body , starija verzija!!!!!
app.use(express.json());
// isto kao i app.use(express.json());  nova verzija
app.use(bodyParser.json());

////
// za primjer
app.post('/', (req, res) => {
  res.send('Primjer');
});

// aplikacija APP Invoice
app.use('/appinvoice', routes);

// Pozdravna poruka
app.get('/', (req, res) => {
  res.json({ msg: 'Pozdrav. Ovo je Aplikacija Invoice' });
});

app.get('/pozdrav', (req, res) => {
  res.json({ msg: 'Dobro došli jos jednom' });
});

// Ako je zadana ruta nepoznata izbacuje grešku
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.message = 'Zadana je ruta koja ne postoji!';
  error.status = 417;
  next(error);
});

// Ako se pojavi graška u programu završava ovdje
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    poruka: 'Greška javljena iz glavnog meddleware',
    error: error.message,
  });
});

// definiranje porta
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Server is running on port - ' + PORT);
});
