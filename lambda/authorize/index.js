/**
 * Lambda function to support JWT.
 * Used for authenticating API requests for API Gateway
 * as a custom authorizor:
 *
 */
const jwt = require('jsonwebtoken');

const generatePolicyDocument = (principalId, effect, resource) => {

  let statementOne = {};
  statementOne.Action = 'execute-api:Invoke'; // default action
  statementOne.Effect = effect;
  statementOne.Resource = resource;

  let policyDocument = {};
  policyDocument.Version = '2012-10-17'; // default version
  policyDocument.Statement = [];
  policyDocument.Statement[0] = statementOne;

  let authResponse = {};
  authResponse.principalId = principalId;
  authResponse.policyDocument = policyDocument;

  return authResponse;
};

/**
 * Handle requests from API Gateway
 * "event" is an object with an "authorizationToken"
 */
exports.handler = function jwtHandler(event, context, callback) {

	const token = event.authorizationToken.split(' ');
  // Check if token is Bearer token
  if (token[0] !== 'Bearer' )
    return callback("Unauthorized");
  // Try verifying JWT token
  try {
    var data = jwt.verify(token[1], process.env['JWT_SECRET']);
    // Check if data contains username
    if (!data || !data.username)
      return callback("Unauthorized");
    // Generate Policy Document and return if every check passed
    return callback(null, generatePolicyDocument(data.username, 'Allow', event.methodArn));
  } catch (err) {
    // Return error if verification fails
    return callback("Unauthorized");
  }
};
