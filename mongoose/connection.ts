import mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

var promise = mongoose.createConnection(process.env.mongoURL, {
    useMongoClient: true,
    /* other options */
});
promise.then(function(db) {
    console.log('Mongo connected')
});
promise.catch(function (e){
    console.log('Connection error :',e )
})
// mongoose.connect(process.env.mongoURL);
export { mongoose };
