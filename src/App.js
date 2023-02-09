import React from 'react';
// import logo from './trivia.png';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';

function App() {
  return (

    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>

  );
}

export default App;
