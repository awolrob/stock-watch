
//When a stock is saved to a watch list - save the following:
//1 - closing history from alph advantage
//2 - company data, link, etc.
//3 - company logo maybe from api.polygon.io

//check local stock data (make Stock model its own document)

export const tickerSaveData = (query) => {
    console.log(query)
    const key = 'UMGBDC67JOA29WPN';
    //return fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${key}`);
    return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${query}&outputsize=full&apikey=${key}`)
};