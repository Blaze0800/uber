const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectToDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const catainRoutes = require('./routes/captain.routes');

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  })


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRoutes);
app.use('/captains', catainRoutes);
module.exports = app;