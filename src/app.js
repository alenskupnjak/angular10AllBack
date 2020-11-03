const chalk = require('chalk'); // boje consol.log....
const express = require('express');
const connectMongoDBInvoice = require('./config/invoice.connect.MongoDB'); // Definicija baze i Import
const morgan = require('morgan'); // ispisaianje na command liniji poruke...
const bodyParser = require('body-parser'); // Body parser, bez ovoga ne mozemo slati podatke u req.body
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const { configureJWTStrategy } = require('./api/middlewares/passport-jwt');
const { configureGoogleStrategy } = require('./api/middlewares/passport-google');
const { configureGithubStrategy } = require('./api/middlewares/passport-github');

// Inicijalizacija aplikacije
console.log(chalk.bold.green('START Aplikacija START'));
const app = express();

// Import routes Aplikacija
const routesInvoice = require('./config/invoice.routes');
const routesCourse = require('./config/course.routes');

// definiramo path za file u koji spremamo potrebne varijable
const dotenv = require('dotenv'); // manage your ENV varijable
dotenv.config({ path: '.vscode/config.env' });

// Spajanje na bazu Invoice
connectMongoDBInvoice();

// Custom Middlevhere
app.use((req, res, next) => {
  console.log(chalk.blue.bgRed.bold('START Middlewhare'));
  req.pozdrav = 'pozdrav iz Middlevhera';
  next();
});

// SWAGGER
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, { explorer: true })
);


// Enable CORS
app.use(cors());

app.use((req, res, next) => {
  console.log(chalk.blue.bgRed.bold('**001**'));
  next();
});


// Concise output colored by response status for development use. The :status token will be colored green for success codes, red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for information codes.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //
}

// Body parser, bez ovoga ne mozemo slati podatke u req.body , starija verzija!!!!!
app.use(express.json());
// isto kao i app.use(express.json());  nova verzija
// is a method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(bodyParser.json());

//  is a method inbuilt in express to recognize the incoming Request Object as strings or arrays.
app.use(express.urlencoded({ extended: true }));

// Nužno za korištenje GOOGLE passporta
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);


// inicijalizacija PASSPORT
app.use(passport.initialize({ userProperty: 'currentUser' }));
app.use((req, res, next) => {
  console.log(chalk.blue.bgRed.bold('** prosao passport.initialize **'));
  next();
});

app.use(passport.session());
configureJWTStrategy();   // JWT strategy
configureGoogleStrategy(); // GOOGLE
configureGithubStrategy(); // GITHUB


// save user into session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// extract the userId from session
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    console.log('001');
    done(null, user);
  });
});


// aplikacija APP Invoice
app.use('/appinvoice', routesInvoice);
app.use('/appcourse', routesCourse );

// Pozdravna poruka
app.get('/', (req, res) => {
  console.log('Pozdravna poruka, User=', req.user);
  res.json({ msg: 'Pozdrav. Ovo je Aplikacija Invoice v.006' });
});

// NEPOZNATA RUTA izbacuje grešku
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.message = 'Zadana je ruta koja ne postoji!';
  error.status = 417;
  next(error);
});

// Error **************************************************
// Ako se pojavi greška u programu završava ovdje
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    poruka: 'Greška javljena iz glavnog meddleware',
    error: error.message,
  });
});

// definiranje porta, pokretanje palikacije na tom portu
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Server is running on port - ' + PORT);
});
