//^ REACT APP STATE

import { Member } from "./member";
import { Product } from "./product";

export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductPageState;
}

//* HOMEPAGE
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}

//* PRODUCTS PAGE
export interface ProductPageState {
  restaurant: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}
//* ORDERS PAGE
