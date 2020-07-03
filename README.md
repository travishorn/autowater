# Autowater

System to record soil moisture and send a signal to add water when low.

## Development

Install dependencies

```
npm install
```

Run the server

```
npx netlify dev
```

### Recording measurements

Send a request like the following.

```
curl --request POST \
  --url http://localhost:8888/.netlify/functions/measurement \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data moisture=0.5 \
  --data recorded_at=2020-06-24T22:19:22+0000
```

## To do

- Authentication
- Store incoming measurements in a database
- Create method for saving settings to database
- Measurement method should check measurement against minimum in settings
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
