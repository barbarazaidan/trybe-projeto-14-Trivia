import React from 'react';
// import logo from './trivia.png';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Ranking from './pages/Ranking';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route path="/ranking" component={ Ranking } />

      </Switch>
    </div>

  );
}

export default App;
