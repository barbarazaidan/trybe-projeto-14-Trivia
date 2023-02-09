import React from 'react';
// import logo from './trivia.png';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </div>

  );
}

export default App;
