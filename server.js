const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;


const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//for  localhost 3000
// mongoose.connect("mongodb://localhost/budget", {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useMongoClient: true
// });

//for heroku mLab
mongoose.connect(process.env.MONGODB_URI || "mongodb://<budget>:<P@55word>@ds245927.mlab.com:45927/heroku_2xb9r3tm", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useMongoClient: true
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});