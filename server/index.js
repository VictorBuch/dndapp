const express = require("express");
const cors = require("cors");
const PORT = 4000;
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const { db } = require('./models/User');

const app = express();

// connect to Mongo DB
mongoose.connect("mongodb+srv://Geyza:bYThslM2YVAnWbJX@cluster0.gg33a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => console.log('db connected'));

app.use(bodyParser.json());
app.use(cors());

app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log("Server running on 4000")
});
