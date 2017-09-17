import mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.mongoURL);
export { mongoose };
