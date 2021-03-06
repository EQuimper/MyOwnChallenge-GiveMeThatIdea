import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import compression from 'compression';
import serverConfig from './config/serverConfig';
import './config/dbConfig';
import { userRoutes, ideaRoutes, categoryRoutes, commentRoutes } from './modules';

const { PORT, CLIENT_ROOT } = serverConfig;

const app = express();

/*
* MIDDLEWARE
*/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', CLIENT_ROOT);
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.status || PORT).render('500');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(compression());

app.use('/api/v1', [
  userRoutes,
  ideaRoutes,
  categoryRoutes,
  commentRoutes
]);

app.listen(PORT, err => {
  if (err) return console.log(`Error happen: ${err}`); // eslint-disable-line
  console.log(`Server run on http://localhost:${PORT}`); // eslint-disable-line
});
