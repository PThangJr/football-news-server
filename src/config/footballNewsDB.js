const mongoose = require('mongoose');
const { mongoDBConfig } = require('../config/config');
// const { PORT, HOST, COLLECTION } = mongoDBConfig;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGGO_SERVER, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected MongoDB successfully!!!');
  } catch (error) {
    console.log('Error MongoDB: ' + error);
  }
};

module.exports = { connect };
