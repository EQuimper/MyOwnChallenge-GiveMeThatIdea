import mongoose from 'mongoose';
import serverConfig from './serverConfig';

const { MONGO_URL } = serverConfig;

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);
mongoose.connection
  .once('open', () => console.log('Connected to MongoDb')) // eslint-disable-line
  .on('error', err => console.warn('Warning', err)); // eslint-disable-line
