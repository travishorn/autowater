require("dotenv").config();

exports.handler = (event, context, callback) => {
  console.log(event);

  if (event.httpMethod !== "POST") return callback(null, {
    statusCode: 405,
    body: `Expected httpMethod to be POST. Received ${event.httpMethod}.`
  });

  /*
   * To do: Check authentication
   */

  /*
   * To do: Save measurement to database
   */

  callback(null, {
    statusCode: 200,
    body: "Measurement recorded."
  });
}
