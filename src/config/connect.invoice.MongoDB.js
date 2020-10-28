const chalk = require('chalk');
const mongoose = require('mongoose');

// spajanje na databazu
const connectDB = () => {
  mongoose
    // eslint-disable-next-line no-undef
    .connect(process.env.DATABASEINVOICE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(
        chalk.bold.blue(
          `${process.env.OS}, Spojen na MongoDB.`
        )
      );
      if (process.env.NODE_ENV === 'production') {
        console.log(chalk.bold.red(`Radim u ${process.env.NODE_ENV} modu`));
      } else {
        console.log(chalk.bold.green(`Radim u ${process.env.NODE_ENV}-modu`));
      }
    })
    .catch((err) => {
      console.log(chalk.bgRed.bold('Greška kod spajanja == ' + err.name));
    });
};

module.exports = connectDB;
