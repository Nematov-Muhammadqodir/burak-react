import React, { useState } from "react";
import { Stack, Container, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { RippleBadge } from "./MaterialTheme/styled";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import UsersPage from "./screens/userPage";
import ProductsPage from "./screens/productsPage";
import AboutPage from "./screens/aboutPage";
import OrdersPage from "./screens/ordersPage";
import HelpPage from "./screens/helpPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import Test from "./screens/Test";
import { CartItem } from "../lib/types/search";

function App() {
  const location = useLocation();
  const cartJson: string | null = localStorage.getItem("cartData");
  const currentCart = cartJson ? JSON.parse(cartJson) : [];

  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);

  const onAdd = (input: CartItem) => {
    console.log("input onAdd", input);
    const exist: any = cartItems.find(
      (item: CartItem) => input._id === item._id
    );

    if (exist) {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = [...cartItems, { ...input }];
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar cartItems={cartItems} />
      ) : (
        <OtherNavbar cartItems={cartItems} />
      )}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>

        <Route path="/orders">
          <OrdersPage />
        </Route>

        <Route path="/member-page">
          <UsersPage />
        </Route>

        <Route path="/help">
          <HelpPage />
        </Route>

        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
