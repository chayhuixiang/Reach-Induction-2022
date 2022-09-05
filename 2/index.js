const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  const cookie = req.cookies["isLoggedIn"];
  if (cookie === "1") {    
    res.sendFile(path.join(__dirname, "views", "success.html"));
  } else {
    res.cookie('isLoggedIn', '0', { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.sendFile(path.join(__dirname, "views", "index.html"));
  }
});

app.post("/admin", (req, res) => {
  const cookie = req.cookies["isLoggedIn"];
  if (cookie === "1") {
    res.sendFile(path.join(__dirname, "views", "success.html"));
  }
  if (req.body.username === "huixiang" && req.body.password === "lets_go_enable_la") {
    res.cookie('isLoggedIn', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname, "views", "failure.html"));
  }
});

app.use(express.static('views'));

app.listen(port, () => {
  console.log(`App Running on port ${port}.`);
});
