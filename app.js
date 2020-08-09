const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Nexmo = require("nexmo");
const socketio = require("socket.io");

const app = express();

// Engine template
app.set("view engine", "html");
app.engine("html", ejs.renderFile);

//Public folder setup
app.use(express.static(__dirname + "/public"));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define port
const port = 3000;

//Start server

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);
