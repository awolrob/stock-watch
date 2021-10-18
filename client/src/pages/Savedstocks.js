import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getMe, deletestock } from '../utils/API';
import Auth from '../utils/auth';
import { removestockId } from '../utils/localStorage';
import Chart from '../components/Chart';

const dateFormat = require('../utils/dateFormat');

const Savedstocks = () => {
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the stock's mongo _id value as param and deletes the stock from the database
  const handleDeletestock = async (stockId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deletestock(stockId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove stock's id from localStorage
      removestockId(stockId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Your Watch List</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedstocks.length
            ? ``
            : 'Search Stocks - Create A Watch List'}
        </h2>
        <CardColumns>
          {userData.savedstocks.map((stock) => {
            return (
              <Card key={stock.stockId} border='dark'>
                <Card.Body>
                  <Card.Title>{stock.title} <br/> Ticker: {stock.stockId} <span>
                  <p className='small'>{stock.types}</p></span></Card.Title>
                  <Card.Text> Watch Started: <br/>{dateFormat(stock.startWatchDt)} </Card.Text>
                  <Chart />
                  <Button className='btn-block btn-danger' onClick={() => handleDeletestock(stock.stockId)}>
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default Savedstocks;
