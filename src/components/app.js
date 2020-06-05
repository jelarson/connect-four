import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./home/home";

export default function App() {
    return (
      <div className="app">
        <Router>
          <div className='app-wrapper'>
            <Switch>
              <Route exact path='/' component={Home} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }

