require('dotenv').config();
const express = require('express');
const cors = require('cors');
const route = require('./routes');
const footballNewsDB = require('./config/footballNewsDB');
const cookieParser = require('cookie-parser');
const errorHandling = require('./app/error-handling/errorHandling');
const bodyParser = require('body-parser');
const sortMiddleware = require('./app/middlewares/sortMiddleware');
// console.log(process.env.PORT);
const bcrypt = require('bcrypt');
const app = express();

footballNewsDB.connect();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.raw());
app.use(express.text());
//Middleware fix CORS
app.use(cors());
// const passwordHash = bcrypt.hash('123456', 10).then((res) => {
//   console.log(res);
// });
app.use(sortMiddleware);
//Routes
route(app);

app.use((req, res, next) => {
  const error = new Error('Page not found');
  error.statusCode = 404;
  next(error);
});
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`App start at PORT: ${PORT}`);
});
