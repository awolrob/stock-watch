import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, ListGroup } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchStocksAPI } from '../utils/API';
import { saveStockIds, getSavedStockIds } from '../utils/localStorage';
import { useMutation } from '@apollo/react-hooks';
import { SAVE_STOCK } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

const SearchStocks = () => {
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
      const data = await searchStocksAPI(searchInput);

      if (!data.ok) {
        throw new Error('Error!');
      }

      const { items } = await data.json();

      const stockData = items.map((stock) => ({
        stockId: stock.id,
        authors: stock.volumeInfo.authors || ['No author to display'],
        title: stock.volumeInfo.title,
        description: stock.volumeInfo.description,
        image: stock.volumeInfo.imageLinks?.thumbnail || '',
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

    try {
      await saveStock({
        variables: { stock: stockToSave },
        update: cache => {
          const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
            query: QUERY_ME, data:
              { ...me, savedStocks: [...me.savedStocks, stockToSave] }
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
        ${searchedStocks.length
            ? `Viewing ${searchedStocks.length} results:`
            : 'Search for a stock to begin'}
        </h2>
        <ListGroup defaultActiveKey="#link1">
          {searchedStocks.map((stock) => {
            return (
              <ListGroup.Item key={stock.stockId}>
                Ticker: {stock.stockId} <br />
                Name: {stock.coName}<br />
                Match Score: {stock.description}<br />
                Type: {stock.type}<br />
                {Auth.loggedIn() && (
                  <Button variant="primary" size="sm"
                    disabled={savedStockIds?.some((savedstockId) => savedstockId === stock.stockId)}
                    // className='btn-block btn-info'
                    onClick={() => handleSaveStock(stock.stockId)}>
                    {savedStockIds?.some((savedstockId) => savedstockId === stock.stockId)
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
