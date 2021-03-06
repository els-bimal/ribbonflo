import { MongoClient } from 'mongodb';
import path from 'path';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import './initialize-db';
import { authenticationRoute } from './authenticate';
import { BasicAuth } from '../services/auth/Basic/index'
import { connectDB } from './connect-db';

let port = process.env.PORT || 8888;
let app = express();

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());
app.listen(port, console.info('Server running, listening on port ', port));

authenticationRoute(app);

//BasicAuth.onLogout();

/*
if (process.env.NODE_ENV == `production`) {
  app.use(express.static(path.resolve(__dirname, '../../dist')));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve('index.html'));
  });
}
*/
