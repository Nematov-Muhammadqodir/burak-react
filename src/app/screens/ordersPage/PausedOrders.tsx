import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";
import { useGlobals } from "../../hooks/useGlobals";

interface PausedOrdersInterface {
  setValue: (input: string) => void;
}

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);
export default function PausedOrders(props: PausedOrdersInterface) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  //* HANDLERS

  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm("Do you wanna cancel the order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log("Error deleteOrderHandler:", err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm(
        "Do you want to proceed with the payment?"
      );

      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log("Error, processOrderHandler", err);
      sweetErrorHandling(err).then();
    }
  };

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
                    value={order._id}
                    sx={{
                      width: 93,
                      height: "100%",
                      background: "#D2B68C",
                      color: "black",
                      fontWeight: "600",
                    }}
                    variant="contained"
                    onClick={deleteOrderHandler}
                  >
                    CANCEL
                  </Button>
                  <Button
                    value={order._id}
                    sx={{
                      width: 93,
                      height: "100%",
                      background: "#70B45B",
                      color: "white",
                      fontWeight: "600",
                    }}
                    variant="contained"
                    onClick={processOrderHandler}
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
