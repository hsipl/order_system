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
  const PreivateContain = [
    { path: "/product", component: Product },
    { path: "/shop", component: Shop },
    { path: "/order", component: Order },
    { path: "/report", component: Report },
    { path: "/handover", component: Handover },
  ];
  return (
    <div>
      <Router>
        <Route path="/login" component={Login}/>


        <Switch>
          <Route path="/" exact component={Home} />
          {PreivateContain.map((item) => (
            <PrivateRoute path={item.path} component={item.component} />
          ))}
          <Route path="/login" component={Login}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
