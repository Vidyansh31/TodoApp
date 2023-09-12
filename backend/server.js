const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes/route");
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/v1/",routes)

const port = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log("Connected to database");
  });
