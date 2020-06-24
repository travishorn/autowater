const path = require("path");

/*
 * dotenv isn't picking up .env file automatically for some reason. Setting
 * manually here. I wonder why this isn't needed in
 * ../src/functions/measurement.js
 */
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const jwt = require("jsonwebtoken");

if (typeof process.argv[2] === "undefined") {
  console.error("Provide a sensor name as an argument.");
  process.exit();
}

const token = jwt.sign({
  sub: process.argv[2]
}, process.env.JWT_SECRET);

console.log(`Sensor name: ${process.argv[2]}`);
console.log(`JWT: ${token}`);
