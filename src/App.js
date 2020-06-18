import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import ExternalApi from "./views/ExternalApi";

import Home from './components/Home'

import "./styles/index.css";
import history from "./utils/history";
import { ThemeProvider } from "@material-ui/core/styles";


function App() {
  return (
    <ThemeProvider>
      <div className="App">
        {/* Don't forget to include the history module */}
        <Router history={history}>
          <header>
            <NavBar />
          </header>
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/external-api" component={ExternalApi} />
            
          </Switch>
          <footer>
          </footer>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
