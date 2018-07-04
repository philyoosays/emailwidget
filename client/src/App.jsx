import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import TokenService from './TokenService';
import Form from './Form';
import Test from './Test';
import Login from './Login';
import Register from './Register';
import AdminPanel from './AdminPanel';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <header>

        </header>
        <Switch>
          <Route
            path="/cpanel/register/admin"
            component={Register}
          />
          <Route
            path="/cpanel/admin/download"
            component={AdminPanel}
          />
          <Route
            path="/cpanel/admin/panel"
            component={AdminPanel}
          />
          <Route
            path="/cpanel/admin"
            component={Login}
          />
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
