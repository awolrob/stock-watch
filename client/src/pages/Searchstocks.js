import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, ListGroup } from 'react-bootstrap';

import Auth from '../utils/auth';
import { savestock, searchStocks } from '../utils/API';
import { savestockIds, getSavedstockIds } from '../utils/localStorage';

const Searchstocks = () => {
  // create state for holding returned google api data
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
      const response = await searchStocks(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      console.log(response)
      const { bestMatches } = await response.json();
      console.log(bestMatches)
      const stockData = bestMatches.map((stock) => ({
        stockId: stock['1. symbol'],
        authors: stock['3. type'] || ['No author to display'],
        title: stock['2. name'],
        description: stock['9. matchScore'],
        image: '',
      }));
      console.log(stockData)
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

    try {
      
      stockToSave.image = Date()
      // ;

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
          {console.log(searchedstocks)}
        </h2>
        <ListGroup defaultActiveKey="#link1">
          {searchedstocks.map((stock) => {
            return (
              <ListGroup.Item >
                Ticker: {stock.stockId} <br />
                Name: {stock.title}<br />
                Match Score: {stock.description}<br />
                Type: {stock.authors}<br />
                {Auth.loggedIn() && (
                  <Button variant="primary" size="sm"
                    disabled={savedstockIds?.some((savedstockId) => savedstockId === stock.stockId)}
                    // className='btn-block btn-info'
                    onClick={() => handleSavestock(stock.stockId)}>
                    {savedstockIds?.some((savedstockId) => savedstockId === stock.stockId)
                      ? 'You are Watching This Stock!'
                      : 'Add Stock to Wish List!'}
                  </Button>
                )}

              </ListGroup.Item>
            )
          })}
        </ListGroup>
        {/* <CardColumns>
          {searchedstocks.map((stock) => {
            return (
              <Card key={stock.stockId} border='dark'>
                {stock.image ? (
                  <Card.Img src={stock.image} alt={`The cover for ${stock.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{stock.title} Ticker: {stock.stockId}</Card.Title>
                  <p className='small'>Authors: {stock.authors}</p>
                  <Card.Text>{stock.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedstockIds?.some((savedstockId) => savedstockId === stock.stockId)}
                      className='btn-block btn-info'
                      onClick={() => handleSavestock(stock.stockId)}>
                      {savedstockIds?.some((savedstockId) => savedstockId === stock.stockId)
                        ? 'This stock has already been saved!'
                        : 'Save this stock!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns> */}
      </Container>
    </>
  );
};

export default Searchstocks;