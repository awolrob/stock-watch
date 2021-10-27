import { getRandomInt } from './randomKey';
require('dotenv').config()

// route to get logged in user's info (needs the token)
// export const getMe = (token) => {
//   return fetch('/api/users/me', {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const createUser = (userData) => {
//   return fetch('/api/users', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });
// };

// export const loginUser = (userData) => {
//   return fetch('/api/users/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });
// };

// save stock data for a logged in user
// export const savestock = (stockData, token) => {
//   return fetch('/api/users', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(stockData),
//   });
// };

// remove saved stock data for a logged in user
// export const deletestock = (stockId, token) => {
//   return fetch(`/api/users/stocks/${stockId}`, {
//     method: 'DELETE',
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

// make a search to alphaavantage stocks symbol search api
export const searchStocksAPI = (query) => {
  const keyIndex = getRandomInt(1, 5)
  let apiKey;
  switch (keyIndex) {
    case 1:
      apiKey = process.env.REACT_APP_ALPHAVANTAGE_API_ROB;
      break;
    case 2:
      apiKey = process.env.REACT_APP_ALPHAVANTAGE_API_MAX;
      break;
    case 3:
      apiKey = process.env.REACT_APP_ALPHAVANTAGE_API_PAT;
      break;
    case 4:
      apiKey = process.env.REACT_APP_ALPHAVANTAGE_API_EDDIE;
      break;
    case 5:
      apiKey = process.env.REACT_APP_ALPHAVANTAGE_API_MASON;
      break;
    default:
      apiKey = process.env.REACT_APP_ALPHAVANTAGE_API_undefined;
  }
    return fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${apiKey}`);

};

//when a stock is added to a watch list - get the daily close history
//This API returns raw (as-traded) daily time series ADJUSTED (date, daily open, daily high, daily low, 
//daily close, daily volume) of the global equity specified, covering 20+ years of historical data. 
//If you are also interested in split/dividend-adjusted historical data, please use the Daily Adjusted API, 
//which covers adjusted close values and historical split and dividend events.
export const queryTickerClose = (query) => {
  const keyIndex = getRandomInt(1, 5)
  let apiKey;
  switch (keyIndex) {
    case 1:
      apiKey = process.env.REACT_APP_ALPHAVANTAGE_API_ROB;
      break;
    case 2:
      apiKey = process.env.REACT_APP_ALPHAVANTAGE_API_MAX;
      break;
    case 3:
      apiKey = process.env.REACT_APP_ALPHAVANTAGE_API_PAT;
      break;
    case 4:
      apiKey = process.env.REACT_APP_ALPHAVANTAGE_API_EDDIE;
      break;
    case 5:
      apiKey = process.env.REACT_APP_ALPHAVANTAGE_API_MASON;
      break;
    default:
      apiKey = process.env.REACT_APP_ALPHAVANTAGE_API_undefined;
  }
  return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${query}&apikey=${apiKey}`)
};

// when a stock is added to a watch list - get the Company Overview data
//Get details for a ticker symbol's company/entity. This provides a general 
//overview of the entity with information such as name, sector, exchange, logo and similar companies
export const queryTickerCoData = (query) => {
  const keyIndex = getRandomInt(1, 5)
  let apiKey;
  switch (keyIndex) {
    case 1:
      apiKey = process.env.REACT_APP_POLYGON_API_ROB;
      break;
    case 2:
      apiKey = process.env.REACT_APP_POLYGON_API_MAX;
      break;
    case 3:
      apiKey = process.env.REACT_APP_POLYGON_API_PAT;
      break;
    case 4:
      apiKey = process.env.REACT_APP_POLYGON_API_EDDIE;
      break;
    default:
      apiKey = process.env.REACT_APP_POLYGON_API_MASON;
  }
  return fetch(`https://api.polygon.io/v1/meta/symbols/${query}/company?apiKey=${apiKey}`)

};