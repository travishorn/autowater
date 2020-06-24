require("dotenv").config();

const jwt = require("jsonwebtoken");

exports.handler = (event, context, callback) => {
  console.log(event);

  if (event.httpMethod !== "POST") return callback(null, {
    statusCode: 405,
    body: `Expected httpMethod to be POST. Received ${event.httpMethod}.`
  });

  if (typeof event.headers.authorization === "undefined") return callback(null, {
    statusCode: 401,
    body: "Expected authorization information. Received none."
  });

  const [ authType, authToken ] = event.headers.authorization.split(" ");

  if (authType !== "Bearer") return callback(null, {
    statusCode: 401,
    body: `Expected authorization type to be Bearer. Received ${authType}.`
  });

  let payload;

  try {
    payload = jwt.verify(authToken, process.env.JWT_SECRET);
  } catch(err) {
    return callback(null, {
      statusCode: 401,
      body: `Could not verify JWT token: ${err.message}`
    });
  }

  callback(null, {
    statusCode: 200,
    body: "Measurement recorded."
  });
}
