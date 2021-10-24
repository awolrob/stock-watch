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
  console.log('alphavantage  symbol search :',query)
  const key = 'UMGBDC67JOA29WPN';
  return fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${key}`);
};

// when a stock is added to a watch list - get the daily close history
export const queryTickerClose = (query) => {
  console.log('alphavantage  time series daily :',query)
  //This API returns raw (as-traded) daily time series (date, daily open, daily high, daily low, daily close, daily volume) of the global equity specified, covering 20+ years of historical data. If you are also interested in split/dividend-adjusted historical data, please use the Daily Adjusted API, which covers adjusted close values and historical split and dividend events.
  const keyAlpha = 'UMGBDC67JOA29WPN';
  return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${query}&outputsize=full&apikey=${keyAlpha}`)
};

// when a stock is added to a watch list - get the Company Overview data
export const queryTickerCoData = (query) => {
  console.log('polygon company data: ',query)
  //Get details for a ticker symbol's company/entity. This provides a general overview of the entity with information such as name, sector, exchange, logo and similar companies
  const keyPolygon = 'YPZ_yboZhWMylCwmZaeWE1Pp9gjQGpUv';
    return fetch(`https://api.polygon.io/v1/meta/symbols/${query}/company?apiKey=${keyPolygon}`)
};