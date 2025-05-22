import TabPanel from "@mui/lab/TabPanel/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order } from "../../../lib/types/order";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";

const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value="3">
      <Stack>
        {finishedOrders.map((order: Order) => {
          return (
            <Box className="order-main-box">
              <Box className="order-main-box-info-container">
                {order.orderItems.map((item) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <div className="ordered-food-container">
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
              <div className="finished-food-total">
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
              </div>
            </Box>
          );
        })}

        {!finishedOrders ||
          (finishedOrders.length === 0 && (
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
