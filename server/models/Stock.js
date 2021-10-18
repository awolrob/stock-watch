const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedstocks` array in User.js
const stockSchema = new Schema({
  type:
  {
    type: String,
  },

  description: {
    type: String,
    required: true,
  },
  // saved stock ticker
  stockId: {
    type: String,
    required: true,
  },
  startWatchDt: {
    type: Date,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = stockSchema;
