import mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.mongoURL, { useMongoClient: true });
export { mongoose };
