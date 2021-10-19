const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/stockwatch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

async function run() {
  await mongoose.connection.dropDatabase();
}
run()

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

module.exports = mongoose.connection;
