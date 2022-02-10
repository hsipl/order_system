import "./App.css";
import Login from "./components/Login";
import Product from "./components/Product";
import Order from "./components/Order";
import Shop from "./components/Shop";
import Report from "./components/Report";
import Home from "./components/Home";
import Handover from "./components/Handover";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/product">
        <Product />
      </Route>

      <Route exact path="/employee">
        <Order />
      </Route>

      <Route exact path="/shop">
        <Shop />
      </Route>

      <Route exact path="/report">
        <Report />
      </Route>

      <Route exact path="/handover">
        <Handover />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>
    </Router>
  );
}

export default App;
