import React from "react";
import "./App.css";
import Login from "./components/Login";
import Product from "./components/Product";
import Employee from "./components/Employee";
import Shop from "./components/Shop/Shop";
import Report from "./components/Report";
import Home from "./components/Home";
import Handover from "./components/Handover";
import PrivateRoute from "./components/PrivateRoute";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  const PreivateContain = [
    { path: "/product", component: Product },
    { path: "/home", component: Home },
    { path: "/shop", component: Shop },
    { path: "/employee", component: Employee },
    { path: "/report", component: Report },
    { path: "/handover", component: Handover },
    { path: "/", component: Home },
  ];
  return (
    <div>
      <Router>
        <Route path="/login" component={Login} />
        <Switch>
          <Route path="/login" exact component={Login} />
          {PreivateContain.map((item, index) => (
            <PrivateRoute
              key={index}
              path={item.path}
              component={item.component}
            />
          ))}
          <Route path="/" component={Home}></Route>
          <Redirect path="*" to="/login"></Redirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
