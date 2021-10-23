const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedstocks` array in User.js
const stockSchema = new Schema({
  // saved stock ticker
  stockId: {
    type: String,
    required: true,
  },
  coName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  description: {
    type: String
  },
  startWatchDt: {
    type: String,
  },
  url: {
    type: String,
  },
  logo: {
    type: String,
  },
  hq_address: {
    type: String
  },
  hq_state: {
    type: String
  },
  hq_country: {
    type: String
  },
  closePrices: [
    {
      date: String,
      close: Number,
    },
  ],
});

module.exports = stockSchema;
