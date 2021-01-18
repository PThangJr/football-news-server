require('dotenv').config();
const express = require('express');
const cors = require('cors');
const route = require('./routes');
const footballNewsDB = require('./config/footballNewsDB');
const pagination = require('./app/middleware/pagination');

// console.log(process.env.PORT);

const app = express();

footballNewsDB.connect();
const PORT = process.env.PORT || 8080;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
//Middleware fix CORS
app.use(cors());

//Middleware

//Routes
route(app);

app.listen(PORT, () => {
  console.log(`App start at PORT: ${PORT}`);
});
