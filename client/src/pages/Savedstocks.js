import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_STOCK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeStockId } from '../utils/localStorage';
import Chart from '../components/Chart';
const dateFormat = require('../utils/dateFormat');


const SavedStocks = () => {
  const { loading, data } = useQuery(QUERY_ME, {fetchPolicy:"network-only"});
  const [removeStock] = useMutation(REMOVE_STOCK);
  const userData = data?.me || {};


  if (!userData?.username) {
    return (
      <h4>You are not logged in!</h4>
    );
  }
  const handleDeleteStock = async (stockId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;


    if (!token) {
      return false;
    }

    try {
      await removeStock({
        variables: { stockId: stockId },
        update: cache => {
          const data = cache.readQuery({ query: QUERY_ME });
          const userDataCache = data.me;
          const savedStocksCache = userDataCache.savedStocks;
          const updatedStockCache = savedStocksCache.filter((stock) =>
            stock.stockId !== stockId
          );
          data.me.savedStocks = updatedStockCache;
          cache.writeQuery({
            query: QUERY_ME,
            data: { data: { ...data.me.savedStocks } }
          })
        }
      });
      removeStockId(stockId);
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) {
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
            console.log(stock)
            return (
              <Card key={stock.stockId} border='dark'>
                <Card.Body>
                  <Card.Title>{stock.coName} <br /> Ticker: {stock.stockId} <br/>
                    {stock.url && <a href={stock.url}>{stock.url}</a>}
                    <p className='small'>{stock.types}</p>
                  </Card.Title>
                  <Card.Text> Watch Started: <br />{dateFormat(stock.startWatchDt)} </Card.Text>
                  <Chart />
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteStock(stock.stockId)}>
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

export default SavedStocks;
