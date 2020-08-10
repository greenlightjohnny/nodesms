const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Nexmo = require("nexmo");
const socketio = require("socket.io");
require("dotenv").config();
const myApiKey = process.env.apiKey;
const myApiSecret = process.env.apiSecret;
console.log("#######", myApiKey);
//Init Nexmo
const nexmo = new Nexmo(
  {
    apiKey: myApiKey,
    apiSecret: myApiSecret,
  },
  { debug: true }
);

const app = express();

// Engine template
app.set("view engine", "html");
app.engine("html", ejs.renderFile);

//Public folder setup
app.use(express.static(__dirname + "/public"));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index route
app.get("/", (req, res) => {
  res.render("index");
});

///Catch form submit
app.post("/", (req, res) => {
  //   res.send(req.body);
  console.log("$$$$$$", req.body.text);
  const number = req.body.number;
  const text = req.body.text;
  console.log(text, number);

  nexmo.message.sendSms(
    "19259679435",
    number,
    text,

    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
        // get data from response
        const data = {
          id: responseData.messages[0]["message-id"],
          number: responseData.messages[0]["to"],
        };
        console.log("####", data);
        io.emit("smsStatus", data);
      }
    }
  );
});

// Define port
const port = 3000;

//Start server

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

/// Connect to socket.io
const io = socketio(server);
io.on("connection", (socket) => {
  console.log("connected");
  io.on("disconnect", () => {
    console.log("Disconnect");
  });
});
