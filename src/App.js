import React from 'react';
// import logo from './trivia.png';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';

function App() {
  return (

    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => <Login { ...props } /> }
        />
        <Route
          exact
          path="/settings"
          render={ (props) => <Settings { ...props } /> }
        />

      </Switch>
    </div>

  );
}

export default App;
