import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./home/home";
import Game from './game/game';

export default function App() {
    return (
      <div className="app">
        <Router>
          <div className='app-wrapper'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/game' component={Game} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }

