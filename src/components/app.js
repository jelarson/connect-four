import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { UserProvider } from './context/context'
import Home from "./home/home";
import Game from './game/game';
import HighScores from './high-scores/highScores'
// import { UserProviderTurn } from "./context/turnContext";

export default function App() {
    return (
      <div className="app">
        {/* <UserProviderTurn> */}
        <UserProvider>
        <Router>
          <div className='app-wrapper'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/game' component={Game} />
              <Route exact path='/highscores' component={HighScores}/>
            </Switch>
          </div>
        </Router>
        </UserProvider>
        {/* </UserProviderTurn> */}
      </div>
    );
  }

