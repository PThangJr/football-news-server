const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Connected MongoDB successfully!!!');
  } catch (error) {
    console.log('Error MongoDB: ' + error);
  }
};

module.exports = { connect };
