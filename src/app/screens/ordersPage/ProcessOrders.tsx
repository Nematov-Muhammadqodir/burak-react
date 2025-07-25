import TabPanel from "@mui/lab/TabPanel/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import moment from "moment";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Messages, serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { T } from "../../../lib/types/common";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

interface ProcessOrdersInterface {
  setValue: (input: string) => void;
}

const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

export default function ProcessOrders(props: ProcessOrdersInterface) {
  const { setValue } = props;
  const { processOrders } = useSelector(processOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();

  //HANDLERS

  const finishedOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Have you received your order?");

      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log("Error, finishedOrderHandler", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="2">
      <Stack>
        {processOrders.map((order: Order) => {
          return (
            <Box key={order._id} className="order-main-box">
              {order.orderItems.map((item) => {
                const product: Product = order.productData.filter(
                  (ele: Product) => item.productId === ele._id
                )[0];

                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <Box key={item._id} className="order-main-box-info-container">
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
                  </Box>
                );
              })}

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

                <div className="process-order-date-container">
                  <p>{moment().format("YY-MM-DD HH:mm")}</p>
                  <Button
                    value={order._id}
                    sx={{
                      width: 138,
                      height: "100%",
                      background: "#3A87CB",
                      color: "white",
                      fontWeight: "600",
                      fontSize: 14,
                      boxSizing: "border-box",
                      padding: 2,
                    }}
                    variant="contained"
                    onClick={finishedOrderHandler}
                  >
                    to fulfil
                  </Button>
                </div>
              </div>
            </Box>
          );
        })}

        {!processOrders ||
          (processOrders.length === 0 && (
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

<Box
  display={"flex"}
  flexDirection={"row"}
  justifyContent={"center"}
  sx={{ width: 821 }}
>
  <img src="/icons/noimage-list.svg" style={{ width: 300, height: 300 }} />
</Box>;
