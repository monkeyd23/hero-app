/**
 * Lambda function to support JWT.
 * Used for authenticating API requests for API Gateway
 * as a custom authorizor:
 *
 */
 const AWS = require('aws-sdk');
 const s3 = new AWS.S3({
   accessKeyId: process.env['S3_ACCESS_KEY_ID'],
   secretAccessKey: process.env['S3_ACCESS_KEY_SECRET']
 });
 const bucketName = process.env['S3_BUCKET_NAME'];

 const MongoClient = require('mongodb').MongoClient;
 const connectionUrl = process.env['MONGO_DB_URL'];

 let cachedDb = null;

 const generateSignedUrl = (newHero, callback) => {
   const url = s3.getSignedUrl('putObject', {
     Bucket: bucketName,
     Key: `${newHero._id}_${newHero.imageName}`,
     Expires: 600
   });
   return callback(null, url);
 };

 const addHero = (db, hero, callback) => {
   const heroCollection = db.collection('jedis');
   heroCollection.insertOne(hero, (err, records) => {
      if (err)
          return callback(null, err);
      const newHero = records.ops[0];
      return generateSignedUrl(newHero, callback);
  });
 };
/**
 * Handle requests from API Gateway
 * "event" is an object with an "authorizationToken"
 */
exports.handler = function jwtHandler(event, context, callback) {
  // Get the user object
  const hero = event;
  context.callbackWaitsForEmptyEventLoop = false;

  try {
      if (cachedDb == null) {
        MongoClient.connect(connectionUrl, function (err, db) {
            // Set cachedDb and continue
            cachedDb = db;
            return addHero(db, hero, callback);
          });
      } else {
        return addHero(cachedDb, hero, callback);
      }
  } catch (err) {
      callback(null, JSON.stringify(err));
  }
};
