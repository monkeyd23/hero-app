/**
 * Lambda function to support JWT.
 * Used for authenticating API requests for API Gateway
 * as a custom authorizor:
 *
 */
 const MongoClient = require('mongodb').MongoClient;

 const connectionUrl = process.env['MONGO_DB_URL'];
 let cachedDb = null;

 const getHeroes = (db, callback) => {
   const heroCollection = db.collection('jedis');
   heroCollection.find({}).toArray( (err, heroes) => {
      if (err)
          return callback(null, err);
      return callback(null, heroes);
  });

 };
/**
 * Handle requests from API Gateway
 * "event" is an object with an "authorizationToken"
 */
exports.handler = function jwtHandler(event, context, callback) {

  context.callbackWaitsForEmptyEventLoop = false;
  try {
      if (cachedDb == null) {
        MongoClient.connect(connectionUrl, function (err, db) {
            // Set cachedDb and continue
            cachedDb = db;
            return getHeroes(db, callback);
          });
      } else {
        return getHeroes(cachedDb, callback);
      }
  } catch (err) {
      callback(null, JSON.stringify(err));
  }
};
