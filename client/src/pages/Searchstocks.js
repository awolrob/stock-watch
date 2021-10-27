import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { searchStocksAPI, queryTickerCoData, queryTickerClose } from '../utils/API';
import Auth from '../utils/auth';
import { saveStockIds, getSavedStockIds } from '../utils/localStorage';
import { SAVE_STOCK } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';

const SearchStocks = () => {
  const { loading, data } = useQuery(QUERY_USER, {fetchPolicy:"network-only"});
  let userData = data?.user || {};
  // create state for holding returned google api data
  const [searchedStocks, setSearchedStocks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved stockId values
  const [savedStockIds, setSavedStockIds] = useState(getSavedStockIds());
  const [saveStock] = useMutation(SAVE_STOCK);
  // set up useEffect hook to save `savedStockIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveStockIds(savedStockIds);
  });

  // create method to search for stocks and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchStocksAPI(searchInput);

      if (!response.ok) {
        throw new Error('Error!');
      }

      const { bestMatches } = await response.json();
      const stockData = bestMatches.map((stock) => ({
        stockId: stock['1. symbol'],
        type: stock['3. type'] || ['No type to display'],
        coName: stock['2. name'],
        startWatchDt: '',
      }));

      setSearchedStocks(stockData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a stock to our database
  const handleSaveStock = async (stockId) => {
    // find the stock in `searchedStocks` state by the matching id
    const stockToSave = searchedStocks.find((stock) => stock.stockId === stockId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    const closeDataResponse = await queryTickerClose(stockId);
    const coResponse = await queryTickerCoData(stockId);
    const d = new Date();
    stockToSave.startWatchDt = d.toLocaleDateString(d.setDate(d.getDate() - 21));

    if (closeDataResponse.ok) {
      const closeDataJSON = await closeDataResponse.json();

      const dates = Object.keys(closeDataJSON['Time Series (Daily)']).reverse();

      // Construct data for chart input
      const closePrices = dates.map(date => date = {
        date,
        close: Number(closeDataJSON['Time Series (Daily)'][date]['4. close'])
      })
      stockToSave.closePrices = JSON.stringify(closePrices);
    }
    if (coResponse.ok) {
      const coData = await coResponse.json();
      stockToSave.url = coData.url;
      stockToSave.logo = coData.logo;
      stockToSave.description = coData.description;
      stockToSave.hq_address = coData.hq_address;
      stockToSave.hq_state = coData.hq_state;
      stockToSave.hq_country = coData.hq_country;
    }
    console.log(stockToSave);
    try {
      await saveStock({
        variables: { stock: stockToSave },
        update: cache => {
          
          // const { user } = cache.readQuery({ query: QUERY_USER });
          let stocks = [...(userData.savedStocks ?? []), stockToSave]
          cache.writeQuery({
            query: QUERY_USER, data:
              {user:{ ...userData}, savedStocks: [...stocks] }
          })
        }
      });
      setSavedStockIds([...savedStockIds, stockToSave.stockId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for stocks!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a stock'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedStocks.length
            ? `Viewing ${searchedStocks.length} results:`
            : 'Search for a stock to begin'}
        </h2>
        <ListGroup defaultActiveKey="#link1">
          {searchedStocks.map((stock) => {
            return (
              <ListGroup.Item key={stock.stockId}>
                Ticker: {stock.stockId} <br />
                Name: {stock.coName}<br />
                Type: {stock.type}<br />
                {Auth.loggedIn() && (
                  // <Button variant="primary" size="sm"
                  <Button
                    variant="primary" size="sm"
                    // className='btn-block btn-info'
                    onClick={() => {
                      // this.setDisable(true)
                      handleSaveStock(stock.stockId)
                    }}
                  // disabled={savedstockIds?.some((savedstockId) => savedstockId === stock.stockId)}
                  // onClick={() => handleSavestock(stock.stockId)}
                  >
                    {savedStockIds?.some((savedStockId) => savedStockId === stock.stockId)
                      ? 'You are Watching This Stock!'
                      : 'Add Stock To Watch List!'}
                  </Button>
                )}
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </Container>
    </>
  );
};

export default SearchStocks;