import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const products = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];
export default function Products() {
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
              />
              <Button
                variant="contained"
                className="avatar-search-btn"
                sx={{
                  "&>p": {
                    fontWeight: 600,
                    fontSize: 15,
                  },
                }}
              >
                <p>Search</p>
                <SearchIcon></SearchIcon>{" "}
              </Button>
            </Stack>
          </Stack>

          <Stack className="dishes-filter-section">
            <Button variant="contained" color="primary" className="order">
              New
            </Button>
            <Button variant="contained" color="secondary" className="order">
              Price
            </Button>
            <Button variant="contained" color="secondary" className="order">
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
              <Button variant="contained" className="dish-btn">
                DISH
              </Button>
              <Button variant="contained" color="secondary">
                SALAD
              </Button>
              <Button variant="contained" color="secondary">
                DRINK
              </Button>
              <Button variant="contained" color="secondary">
                DESSERT
              </Button>
              <Button variant="contained" color="secondary">
                OTHER
              </Button>
            </Stack>

            <Stack>
              <div className="product-card-container">
                {products.length !== 0 ? (
                  products.map((ele, index) => {
                    return (
                      <div className="product-card">
                        <p className="product-size-absolute">LARGE size</p>
                        <div className="product-card-image">
                          <img src={ele.imagePath} alt="" />
                          <div className="image-hover-overlay">
                            <div className="hover-icons">
                              <div className="korzinka-container">
                                <img src="/icons/shopping-cart.svg" alt="" />
                              </div>
                              <div className="eye-icon-container">
                                <Badge badgeContent={4} color="secondary">
                                  <RemoveRedEyeIcon />
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="product-card-info">
                          <p className="product-name">{ele.productName}</p>
                          <div className="product-price-contsiner">
                            <MonetizationOnIcon />
                            <p>15</p>
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
              count={3}
              page={1}
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
