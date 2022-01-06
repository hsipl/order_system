import "./App.css";
import Login from "./components/Login";
import Product from "./components/Product";
import Order from "./components/Order";
import Shop from "./components/Shop";
import Report from "./components/Report";
import Home from "./components/Home";
import Handover from "./components/Handover";
import React from "react";
import PrivateRoute from "./components/PrivateRoute";

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Route path="/login">
          <Login />
        </Route>

        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/product" component={Product} />
          <PrivateRoute path="/shop" component={Shop} />
          <PrivateRoute path="/order" component={Order} />
          <PrivateRoute path="/report" component={Report} />
          <PrivateRoute path="/handover" component={Handover} />
          <Route path="/login" render={() => <login />}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
