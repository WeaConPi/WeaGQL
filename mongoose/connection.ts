import mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.mongoUrl);
export { mongoose }
