import express from 'express';
import logger from 'morgan';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import dbConnection from './src/utils/dbConnection';

// import environmental variables from our variables.env file
require('dotenv').config({ path: '.env' });

//import module
import routes from './src/routes';
import { notFound, developmentErrors, productionErrors } from './src/utils/errorHandlers';

// Connect to our Database and handle an bad connections
dbConnection();

// init Express app
const app = express();

// having fun
app.use((req, res, next) => {
  res.header('X-powered-by', 'Blood, sweat, and tears.');
  next();
});

//route logger
app.use(logger('dev'));

// Takes the raw requests and turns them into usable properties on req.body
app.use(json());
app.use(urlencoded({ extended: true }));

// Enable CORS
app.use(cors());


//use route module
app.use('/api/v1', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(notFound);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(developmentErrors);
}

// production error handler
app.use(productionErrors);

app.set('port', process.env.PORT);
const server = app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`App running  🏃  on PORT ${server.address().port}`);
});
