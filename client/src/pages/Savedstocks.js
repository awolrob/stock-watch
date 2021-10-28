import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { REMOVE_STOCK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeStockId } from '../utils/localStorage';
import Chart from '../components/Chart';
const dateFormat = require('../utils/dateFormat');


const SavedStocks = () => {
  const { loading, data } = useQuery(QUERY_USER, { fetchPolicy: "network-only" });
  const [removeStock] = useMutation(REMOVE_STOCK);
  const userData = data?.user || {};


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
          // const data = cache.readQuery({ query: QUERY_USER });
          // const userDataCache = data.user;
          const savedStocksCache = userData.savedStocks;
          const updatedStockCache = savedStocksCache.filter((stock) =>
            stock.stockId !== stockId
          );
          // userData.savedStocks = updatedStockCache;
          cache.writeQuery({
            query: QUERY_USER,
            data: { user: { ...userData, savedStocks: updatedStockCache } }
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
          <h1 className="text-white">Your Watch List</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedStocks.length
            ? ``
            : 'Search Stocks - Create A Watch List'}
        </h2>
        <CardColumns>
          {userData.savedStocks.map((stock) => {

            return (
              <Card key={Math.random(Date.now())} border='dark'>
                <Card.Body>
                  <Card.Title>{stock.coName} <br /> Ticker: {stock.stockId} <br />
                    <p className='small'>{stock.type}</p>
                    {stock.url && <a href={stock.url}>{stock.url}</a>}
                    {stock.url && <br />}
                    {stock.logo && <img src={stock.logo} border="0" alt={stock.coName} width="76" height="57" />}
                    {stock.url && <p>Head Quarter Address: <br /><span className='small'>{stock.hq_address} {stock.hq_country}</span></p>}
                    {/* {stock.url && <p className='small'>{stock.description}</p>} */}
                  </Card.Title>
                  <Card.Text> Watch Started: {dateFormat(stock.startWatchDt)} <br />
                    Last Close: <br />
                    {stock.closePrices.length && (
                      `${dateFormat(stock.closePrices[stock.closePrices.length - 1].date)} @ USD$${stock.closePrices[stock.closePrices.length - 1].close}`)}
                    <br />
                  </Card.Text>

                  <p className='small'>Price History Since Your Watch Started </p>
                  <Chart closePrices={stock.closePrices} startWatchDt={stock.startWatchDt} fill="#82ca9d" />
                  <br />
                  <p className='small'>All Price History</p>
                  <Chart closePrices={stock.closePrices} startWatchDt={0} fill="#8884d8" />
                  <br />
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


// const history = useHistory();

// const searchClick = () => {
//   history.push('./')
// }
// const saveClick = () => {
//   history.push('./saved')
// }
// const cashClick = () => {
//   history.push('./stripe')
// }
// const signClick = () => {
//   history.push('./signup')
// }
