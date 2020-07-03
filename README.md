# Autowater

System to record soil moisture and send a signal to add water when low.

## Development

Clone the repository

```
git clone https://github.com/travishorn/autowater.git
```

Change into the directory

```
cd autowater
```

Install dependencies

```
npm install
```

Create a `.env` file (or set environment variables however you like) with your
database credentials

```
DB_USER=exampleuser
DB_PASSWORD=examplepassword
DB_URL=example.com/autowater
```

Run the server

```
npx netlify dev
```

### Database schema

The server will attempt to connect to the MongoDB database specified by the
environment variables. This database should have a collection named `sensors`.

The `sensors` collection should have one or more documents in this format:

```
{
  _id: ObjectId("..."),
  name: "Example Sensor",
  keys: [
    "examplekey"
  ]
}
```

Each sensor must have at least one key. The key is used for authenticating your
sensor when recording measurements.

### Recording measurements

Send a request like the following. Make note of the key in the authorization
header. It must match a key on a sensor in the database.

```
curl --request POST \
  --url http://localhost:8888/.netlify/functions/measurement \
  --header 'content-type: application/x-www-form-urlencoded' \
  --header 'authorization: Bearer examplekey' \
  --data moisture=0.5 \
  --data recorded_at=2020-06-24T22:19:22+0000
```

Measurements are added to an array on the sensor document in the database. After
making the request above, the sensor document may appear like this:

```
  _id: ObjectId("..."),
  name: "Example Sensor",
  keys: [
    "examplekey"
  ],
  measurements: [
    ... any previous measurements ...,
    {
      moisture: 0.5,
      recorded_at: 2020-06-24T22:19:22+0000
    }
  ]
```

## To do

- Create method for saving settings to database
- Measurement function should check measurement against minimum in settings
- If measurement is below minimum, send a water signal
- Create function for pulling stored measurements
- Write deployment documentation (already partly configured for Netlify)

## License

Copyright 2020 Travis Horn

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
