require("dotenv").config();

const qs = require("querystring");

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

exports.handler = (event, context, callback) => {
  client.connect(() => {
    if (event.httpMethod !== "POST") return callback(null, {
      statusCode: 405,
      body: `Expected httpMethod to be POST. Received ${event.httpMethod}.`
    });

    /*
     * Check authentication
     */
    if (typeof event.headers.authorization === "undefined") return callback(null, {
      statusCode: 401,
      body: "Expected authorization information. Received none."
    });

    const [ authType, authKey ] = event.headers.authorization.split(" ");

    if (authType !== "Bearer") return callback(null, {
      statusCode: 401,
      body: `Expected authorization type to be Bearer. Received ${authType}.`
    });

    const sensors = client.db("autowater").collection("sensors");

    const { moisture, recorded_at } = qs.parse(event.body);

    sensors.findOneAndUpdate(
      { keys: { $all: [authKey] } },
      { $push: { measurements: {
        moisture,
        recorded_at
      } } },
      (err, doc) => {
        if (err) return callback(null, {
          statusCode: 500,
          body: ""
        });

        if (!doc) return callback(null, {
          statusCode: 404,
          body: `The supplied key does not match any sensor. Key: ${authKey}`
        });

        callback(null, {
          statusCode: 200,
          body: "Measurement recorded."
        });

        client.close();
      }
    );
  });
};
