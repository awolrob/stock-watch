import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, ListGroup } from 'react-bootstrap';

import Auth from '../utils/auth';
import { savestock, searchStocksAPI, queryTickerCoData, queryTickerClose } from '../utils/API';
import { savestockIds, getSavedstockIds } from '../utils/localStorage';

const Searchstocks = () => {
  // create state for holding returned api data
  const [searchedstocks, setSearchedstocks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state to hold saved stockId values
  const [savedstockIds, setSavedstockIds] = useState(getSavedstockIds());
  // set up useEffect hook to save `savedstockIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => savestockIds(savedstockIds);
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
        throw new Error('something went wrong!');
      }
      const { bestMatches } = await response.json();
      const stockData = bestMatches.map((stock) => ({
        stockId: stock['1. symbol'],
        type: stock['3. type'] || ['No type to display'],
        coName: stock['2. name'],
        startWatchDt: '',
      }));
      setSearchedstocks(stockData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a stock to our database
  const handleSavestock = async (stockId) => {
    // find the stock in `searchedstocks` state by the matching id
    const stockToSave = searchedstocks.find((stock) => stock.stockId === stockId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    const closeDataResponse = await queryTickerClose(stockId);
    const coResponse = await queryTickerCoData(stockId);

    /* ******************
    TEST CODE - REMOVE TEST DATE - used to get data to display graph since date watch started
       ********************* */
    // stockToSave.startWatchDt = new Date();
    const d = new Date();
    stockToSave.startWatchDt = d.toLocaleDateString(d.setDate(d.getDate() - 21));
    /* ******************
    TEST CODE - REMOVE TEST DATE  
       ********************* */
    //save date stock watch started 
    // const closeDataResponse = await queryTickerClose(stockId);

    //try to parse close data - IF API successful
    try {
      if (closeDataResponse.ok) {
        const closeDataJSON = await closeDataResponse.json();

        const dates = Object.keys(closeDataJSON['Time Series (Daily)']).reverse();

        // Construct data for chart input
        const closePrices = dates.map(date => date = {
          date,
          close: Number(closeDataJSON['Time Series (Daily)'][date]['4. close'])
        })
        stockToSave.closePrices = closePrices;
      }
    } catch (err) {
      console.error(err);
    }

    //try to parse company data - IF API successful
    try {
      if (coResponse.ok) {
        const coData = await coResponse.json();
        stockToSave.url = coData.url;
        stockToSave.logo = coData.logo;
        stockToSave.description = coData.description;
        stockToSave.hq_address = coData.hq_address;
        stockToSave.hq_state = coData.hq_state;
        stockToSave.hq_country = coData.hq_country;
      }
    } catch (err) {
      console.error(err);
    }

    //try to save stock data
    try {
      const response = await savestock(stockToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if stock successfully saves to user's account, save stock id to state
      setSavedstockIds([...savedstockIds, stockToSave.stockId]);
    } catch (err) {
      console.error(err);
    }

  };
  const [disable, setDisable] = useState(false);

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
          {searchedstocks.length
            ? `Viewing ${searchedstocks.length} results:`
            : 'Search for a stock to begin'}
        </h2>
        <ListGroup defaultActiveKey="#link1">
          {searchedstocks.map((stock) => {
            return (
              <ListGroup.Item key={stock.stockId}>
                Ticker: {stock.stockId} <br />
                Name: {stock.coName}<br />
                Type: {stock.type}<br />
                {Auth.loggedIn() && (
                  // <Button variant="primary" size="sm"
                  <Button
                    variant="primary" size="sm"
                    disabled={disable}
                    // className='btn-block btn-info'
                    onClick={() => {
                      // this.setDisable(true)
                      handleSavestock(stock.stockId)
                    }}
                  // disabled={savedstockIds?.some((savedstockId) => savedstockId === stock.stockId)}
                  // onClick={() => handleSavestock(stock.stockId)}
                  >
                    {savedstockIds?.some((savedstockId) => savedstockId === stock.stockId)
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

export default Searchstocks;
