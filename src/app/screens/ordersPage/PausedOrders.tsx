import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);
export default function PausedOrders() {
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  //* HANDLERS

  let numberOfOrders = [1, 2];
  let numberOfFoods = [1, 2, 3];

  return (
    <TabPanel value="1">
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className="order-main-box">
              <Box className="order-main-box-info-container">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];

                  console.log("product:", product);
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <div key={item._id} className="ordered-food-container">
                      <div className="ordered-food-name">
                        <img src={imagePath} alt="" />
                        <p>{product.productName}</p>
                      </div>
                      <div className="ordered-food-price">
                        <span>${product.productPrice}</span>
                        <img src="../../../icons/close.svg" alt="" />
                        <span>{item.itemQuantity}</span>
                        <img src="../../../icons/pause.svg" alt="" />
                        <span>${item.itemPrice * item.itemQuantity}</span>
                      </div>
                    </div>
                  );
                })}
              </Box>

              <div className="ordered-food-total">
                <div className="total-numbers">
                  <span>Product price</span>
                  <span>${order.orderTotal - order.orderDelivery}</span>
                  <img src="../../../icons/plus.svg" alt="" />
                  <span> Delivery cost</span>
                  <span>${order.orderDelivery}</span>
                  <img src="../../../icons/pause.svg" alt="" />
                  <span>Total</span>
                  <span>${order.orderTotal}</span>
                </div>

                <div className="ordered-food-btns">
                  <Button
                    sx={{
                      width: 93,
                      height: "100%",
                      background: "#D2B68C",
                      color: "black",
                      fontWeight: "600",
                    }}
                    variant="contained"
                  >
                    CANCEL
                  </Button>
                  <Button
                    sx={{
                      width: 93,
                      height: "100%",
                      background: "#70B45B",
                      color: "white",
                      fontWeight: "600",
                    }}
                    variant="contained"
                  >
                    PAYMENT
                  </Button>
                </div>
              </div>
            </Box>
          );
        })}

        {!pausedOrders ||
          (pausedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              sx={{ width: 821 }}
            >
              <img
                src="/icons/noimage-list.svg"
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
