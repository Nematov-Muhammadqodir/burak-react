import React from "react";
import "../css/app.css";
import { Stack, Container, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { RippleBadge } from "./MaterialTheme/styled";
import { Link, Route, Switch } from "react-router-dom";
import { HomePage } from "./screens/homePage";
import { UsersPage } from "./screens/userPage";
import { ProductsPage } from "./screens/productsPage";
import { AboutPage } from "./screens/aboutPage";
import { OrdersPage } from "./screens/ordersPage";
import { HelpPage } from "./screens/helpPage";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">HomePage</Link>
          </li>
          <li>
            <Link to="/products">ProductsPage</Link>
          </li>
          <li>
            <Link to="/orders">OrdersPage</Link>
          </li>
          <li>
            <Link to="/member-page">UserPage</Link>
          </li>
          {/* <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/help">HelpPage</Link>
          </li> */}
        </ul>
      </nav>

      <Switch>
        <Route path="/products">
          <ProductsPage />
        </Route>

        <Route path="/orders">
          <OrdersPage />
        </Route>

        <Route path="/member-page">
          <UsersPage />
        </Route>

        <Route path="/">
          <HomePage />
        </Route>

        {/* <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
