import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TokenService from './TokenService';
import Form from './Form';
import Test from './Test';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    TokenService.destroy()
    window.location.replace('/login')
  }

  render() {
    return (
      <div className="App">
        <header>

        </header>
        <Switch>
          <Route
            path="/form/:id"
            component={Form}
          />
          <Route
            exact path="/"
            component={Test}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
