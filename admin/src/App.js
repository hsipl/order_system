import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
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
  Redirect,
} from "react-router-dom";
import Cookies from "js-cookie";

import styled from "styled-components";
const LogoutBtn = styled.button`
  position: relative;
  top: 6rem;
  left: 10rem;
  max-width: 88%;
  font-size: 20px;
`;

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
        <Route path="/login">
          <Login />
        </Route>

        <Switch>
          <Route path="/" exact component={Home} />
          {PreivateContain.map((item) => (
            <PrivateRoute path={item.path} component={item.component} />
          ))}
          <Route path="/login" render={() => <login />}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
