const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const items = require("./routes/api/items");
const books = require("./routes/api/books");
const users = require("./routes/api/users");

const app = express();

app.use(bodyParser.json());

//Database config
const database = require("./config/keys").mongoURI;

//MongoDB connection
mongoose
  .connect(database)
  .then(() => console.log("MongoDb connceted"))
  .catch((err) => console.log(err));

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
//user Routes
//app.use("/api/items", items);
app.use("/api/books", books);
app.use("/api/users", users);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server Started on Port : ${port}`));
