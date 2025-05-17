import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { Product, ProductInquery } from "../../../lib/types/product";
import { setProducts } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { retrieveProducts } from "./select";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRestriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (input: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;

  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRestriever);
  const [productSearch, setProductsSearch] = useState<ProductInquery>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();

    product
      .getProducts(productSearch)
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log("Error, setRestaurant Products.tsx:", err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductsSearch({ ...productSearch });
    }
  }, [searchText]);

  //^ HANDLERS
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductsSearch(() => ({
      ...productSearch,
    }));
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductsSearch(() => ({
      ...productSearch,
    }));
  };

  const searchProductHandler = () => {
    setProductsSearch(() => ({
      ...productSearch,
      search: searchText,
    }));
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductsSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="products">
      <Container>
        <Stack
          // sx={{ background: "green" }}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Stack className="avatar-big-box">
            <Stack className="avatar-big-box-container">
              <Typography className="avatar-intro">Burak Restaurant</Typography>
              <input
                className="avatar-search-bar"
                type="text"
                placeholder="Type here"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchProductHandler();
                  }
                }}
              />
              <Button
                variant="contained"
                className="avatar-search-btn"
                endIcon={<SearchIcon />}
                sx={{
                  "&>p": {
                    fontWeight: 600,
                    fontSize: 15,
                  },
                }}
                onClick={searchProductHandler}
              >
                <p>Search</p>
              </Button>
            </Stack>
          </Stack>

          <Stack className="dishes-filter-section">
            <Button
              variant="contained"
              color={
                productSearch.order === "createdAt" ? "primary" : "secondary"
              }
              className="order"
              onClick={() => searchOrderHandler("createdAt")}
            >
              New
            </Button>
            <Button
              variant="contained"
              color={
                productSearch.order === "productPrice" ? "primary" : "secondary"
              }
              className="order"
              onClick={() => searchOrderHandler("productPrice")}
            >
              Price
            </Button>
            <Button
              variant="contained"
              color={
                productSearch.order === "productViews" ? "primary" : "secondary"
              }
              className="order"
              onClick={() => searchOrderHandler("productViews")}
            >
              Views
            </Button>
          </Stack>

          <Stack className="products-container">
            <Stack
              className="product-category-btns"
              sx={{
                "&>button": {
                  height: 36,
                  width: 79,
                  // writingMode: "vertical-rl",
                  // textOrientation: "upright",
                  transform: "rotate(-90deg)",
                },
              }}
            >
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.DISH
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.DISH)}
              >
                DISH
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.SALAD
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  searchCollectionHandler(ProductCollection.SALAD);
                }}
              >
                SALAD
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.DRINK
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
              >
                DRINK
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.DESSERT
                    ? "primary"
                    : "secondary"
                }
                onClick={() =>
                  searchCollectionHandler(ProductCollection.DESSERT)
                }
              >
                DESSERT
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.OTHER
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
              >
                OTHER
              </Button>
            </Stack>

            <Stack>
              <div className="product-card-container">
                {products.length !== 0 ? (
                  products.map((product: Product) => {
                    const imagePath = `${serverApi}/${product.productImages[0]}`;

                    const sizeVolume =
                      product.productCollection === ProductCollection.DRINK
                        ? `${product.productVolume} litre`
                        : `${product.productSize} size`;
                    return (
                      <div
                        className="product-card"
                        key={product._id}
                        onClick={() => chooseDishHandler(product._id)}
                      >
                        <p className="product-size-absolute">{sizeVolume}</p>
                        <div className="product-card-image">
                          <img src={imagePath} alt="" />
                          <div className="image-hover-overlay">
                            <div className="hover-icons">
                              <button
                                className="korzinka-container"
                                onClick={(e) => {
                                  onAdd({
                                    _id: product._id,
                                    quantity: 1,
                                    name: product.productName,
                                    price: product.productPrice,
                                    image: product.productImages[0],
                                  });
                                  e.stopPropagation();
                                }}
                              >
                                <img src="/icons/shopping-cart.svg" alt="" />
                              </button>
                              <div className="eye-icon-container">
                                <Badge
                                  badgeContent={product.productViews}
                                  color="secondary"
                                >
                                  <RemoveRedEyeIcon
                                    sx={{
                                      color:
                                        product.productViews === 0
                                          ? "grey"
                                          : "white",
                                    }}
                                  />
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="product-card-info">
                          <p className="product-name">{product.productName}</p>
                          <div className="product-price-contsiner">
                            <MonetizationOnIcon />
                            <p>{product.productPrice}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <Box className="no-data">Products are not available now!</Box>
                )}
              </div>
            </Stack>
          </Stack>

          <Stack className="pagination-section">
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
      <div className="brands-logo">
        <div className="brands-logo-intro">
          <h2>Our Family Brands</h2>
        </div>

        <div className="brands-logo-images">
          <div className="brand-img-container">
            <img src="/img/gurme.webp" alt="" />
          </div>
          <div className="brand-img-container">
            <img src="/img/seafood.webp" alt="" />
          </div>
          <div className="brand-img-container">
            <img src="/img/sweets.webp" alt="" />
          </div>
          <div className="brand-img-container">
            <img src="/img/doner.webp" alt="" />
          </div>
        </div>
      </div>

      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47991.5361443031!2d69.2040889!3d41.3110815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b05d24c2561%3A0x48b7e61a7d926b53!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2skr!4v1684560123456"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}

//Hello
