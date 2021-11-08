import { createRequire } from 'module';
const require = createRequire(import.meta.url);

require('dotenv').config();
const { User } = require('../models');
const apiKey = process.env.REACT_APP_ALPHAVANTAGE_API_MAX;
let request = require('request');

const getTickerClose = async (ticker) => {

  let closePrices = [];
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apiKey}`;
  // console.log(url)
  request.get(
    {
      url: url,
      json: true,
      headers: { 'User-Agent': 'request' }
    }, (err, res, closeDataResponse) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        // data is successfully parsed as a JSON object:
        // console.log("          ", ticker, closeDataResponse);

        const dates = Object.keys(closeDataResponse['Time Series (Daily)']).reverse();
        // console.log(dates);
        closePrices = dates.map(date => date = {
          date,
          close: Number(closeDataResponse['Time Series (Daily)'][date]['4. close'])
        })

        // stockToSave.closePrices = closePrices;
        console.log("          ", ticker, closePrices[0])
      }
    }
  )
  return closePrices;
};

export const queryTickerClose = async () => {
  const userData = await User.find();
  // console.log(userData[6].savedStocks[0].closePrices);
  for (let i = 0; i < userData.length; i++) {
    console.log(userData[i].username, userData[i].email);
    for (let x = 0; x < userData[i].savedStocks.length; x++) {
      console.log("   ", userData[i].savedStocks[x].stockId);
      let symbolID = userData[i].savedStocks[x].stockId || "";
      getTickerClose(symbolID);
    }
  };

};

