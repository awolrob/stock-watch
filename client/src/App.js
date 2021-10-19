import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Searchstocks from './pages/Searchstocks';
import Savedstocks from './pages/Savedstocks';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Searchstocks} />
          <Route exact path='/saved' component={Savedstocks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
