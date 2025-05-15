import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { useDispatch } from "react-redux";
import { ProductCollection } from "../../../lib/enums/product.enum";

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),

  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes } = actionDispatch(useDispatch());

  //Selector: Store => Data

  useEffect(() => {
    const product = new ProductService();

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        // productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        setPopularDishes(data);
      })
      .catch((err) => console.log("Error, getProducts:", err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        // productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        console.log("data before Redux2:", data);
        setNewDishes(data);
      })
      .catch((err) => console.log("Error, getProducts:", err));
  }, []);

  return (
    <div className="homepage">
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
