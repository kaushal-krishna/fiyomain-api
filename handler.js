const serverless = require('serverless-http');
import app from './index.js';

module.exports.handler = serverless(app);