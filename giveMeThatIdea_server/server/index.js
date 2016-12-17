import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import serverConfig from './config/serverConfig';
import './config/dbConfig';
import { userRoutes } from './modules';

const { PORT } = serverConfig;

const app = express();

/*
* MIDDLEWARE
*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(passport.initialize());

app.use('/api/v1', [userRoutes]);

app.listen(PORT, err => {
  if (err) return console.log(`Error happen: ${err}`); // eslint-disable-line
  console.log(`Server listen to http://localhost:${PORT}`); // eslint-disable-line
});
