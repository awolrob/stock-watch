import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { User } = require('../models');

export const queryTickerClose = async (query) => {
  const userData = await User.find();
  console.log(userData[6]);

  const apiKey = process.env.REACT_APP_ALPHAVANTAGE_API_MAX;
  var request = require('request');
  var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${apiKey}`;

  request.get({
    url: url,
    json: true,
    headers: { 'User-Agent': 'request' }
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data['Meta Data']['3. Last Refreshed']);
    }
  })
};