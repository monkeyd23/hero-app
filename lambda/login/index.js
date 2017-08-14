'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;

const connectionUrl = process.env['MONGO_DB_URL'];
let cachedDb = null;

/**
* Function that handles user authorization after successful connection
*/
const authorizeUser = (db, user, callback) => {
  // Get the collection object
  const usersCollection = db.collection('users');
  // find the user
  usersCollection.findOne({ username: user.username }, (err, result) => {
    // Return Error if user not found or password incorrect
    if (!result || !bcrypt.compareSync(user.password, result.password))
      return callback(null, "Invalid username or password");
    // Create payload if username and password are valid
    const payload = { username: result.username, admin: result.admin};
    // Create token with payload
    const token = jwt.sign(payload, process.env['JWT_SECRET'],{expiresIn: '4h'});
    // Callback with success message
    const response = {"message": "authenticated", "token": token};
    return callback(null, response);
  });
};

const buildError = (status, message) => {
  let myErrorObj = {};

  myErrorObj.httpStatus = status;
  myErrorObj.message = message;

  switch (status) {
    case 400:
      myErrorObj.errorType = "Bad Request";
      break;
    case 401:
      myErrorObj.errorType = "Unauthorized";
      break;
    case 403:
      myErrorObj.errorType = "Forbidden";
      break;
    default:
      myErrorObj.errorType = "Unkown error";
      myErrorObj.httpStatus = 500;
      break;
  }
  return JSON.stringify(myErrorObj);
};
/**
 * A simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To login a user using mlab mongo db credentials.
 * Send Error if invalid credentials.
 */
exports.handler = (event, context, callback) => {
    // Get the user object
    const user = event;
    // Set this false to terminate execution on callback
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        if (cachedDb == null) {
          MongoClient.connect(connectionUrl, function (err, db) {
              // Set cachedDb and continue
              cachedDb = db;
              return authorizeUser(db, user, callback);
            });
        } else {
          return authorizeUser(cachedDb, user, callback);
        }
    } catch (err) {
        callback(null, JSON.stringify(err));
    }
};
