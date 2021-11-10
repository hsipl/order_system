import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Muitest from "./components/Muitest";
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
        <Navbar />
        <Home />
      </Route>

      <Route exact path="/product">
        <Navbar />
        <Product />
      </Route>

      <Route exact path="/order">
        <Navbar />
        <Order />
      </Route>

      <Route exact path="/shop">
        <Navbar />
        <Shop />
      </Route>

      <Route exact path="/report">
        <Navbar />
        <Report />
      </Route>

      <Route exact path="/handover">
        <Navbar />
        <Handover />
      </Route>

    </Router>
  );
}

export default App;
