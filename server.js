var express = require("express");
var Pusher = require("pusher");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8090;

var pusher = new Pusher({
  appId: "1212641",
  key: "c244e1ce8fbab722ca7d",
  secret: "27f0a539e10b1604af00",
  cluster: "ap1",
  encrypted: true,
  useTLS: true,
});

app.get("/test", function (req, res) {
  res.json({ success: 200 });
});

app.post("/messages/:room", function (req, res) {
  var message = req.body;
  var chatRoom = req.params.room;
  pusher.trigger(chatRoom, "new_message", message);
  res.json({ success: 200 });
});

app.listen(port);
console.log("REST API is runnning at " + port);
