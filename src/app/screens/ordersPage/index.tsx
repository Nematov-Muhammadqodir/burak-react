import { Container, Stack } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { SyntheticEvent, useEffect, useState } from "react";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/orders.css";
import Divider from "../../components/divider";
import { Order, OrderInquery } from "../../../lib/types/order";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const history = useHistory();

  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();
  const [value, setValue] = useState("1");
  const [orderInquery, setOrderInquery] = useState<OrderInquery>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquery, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquery, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquery, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquery, orderBuilder]);

  //^ HANDLERS

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/");
  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box
              className="order-nav-frame"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                className="table-list"
              >
                <Tab label="PAUSED ORDERS" value="1" />
                <Tab label="PROCESS ORDERS" value="2" />
                <Tab label="FINISHED ORDERS" value="3" />
              </Tabs>
            </Box>
            <Stack className="order-main-content">
              <div>
                <PausedOrders setValue={setValue} />
                <ProcessOrders setValue={setValue} />
                <FinishedOrders />
              </div>

              <div className="ordered-user-info">
                <div className="ordered-user">
                  <div className="user-image">
                    <img
                      src={
                        authMember?.memberImage
                          ? `${serverApi}/${authMember.memberImage}`
                          : "../../../icons/default-user.svg"
                      }
                      alt=""
                    />
                    <img
                      className="user-badge"
                      src={
                        authMember?.memberType === MemberType.RESTAURANT
                          ? "/icons/restaurant.svg"
                          : `/icons/user-badge.svg`
                      }
                      alt=""
                    />
                  </div>
                  <div className="user-name">
                    <h2>{authMember?.memberNick}</h2>
                    <h4>USER</h4>
                  </div>
                  <div className="divider" />

                  <div className="user-address">
                    <img src="../../../icons/location.svg" alt="" />
                    <p>
                      {" "}
                      {authMember?.memberAddress
                        ? authMember.memberAddress
                        : "Do not exist!"}
                    </p>
                  </div>
                </div>

                <div className="ordered-payments">
                  <div className="payment-inputs">
                    <input
                      className="card-number"
                      type="number"
                      placeholder="Card number : 5243 4090 2002 7495"
                    />
                    <div className="card-info">
                      <input
                        className="card-due-date"
                        type="number"
                        placeholder="07 / 24"
                      />
                      <input
                        className="card-cvv"
                        type="number"
                        placeholder="CVV : 010"
                      />
                    </div>
                    <input
                      placeholder="Kevin Nematov"
                      className="card-holder-name"
                      type="text"
                    />
                  </div>

                  <div className="card-images">
                    <img src="../../../icons/western-card.svg" alt="" />
                    <img src="../../../icons/master-card.svg" alt="" />
                    <img src="../../../icons/paypal-card.svg" alt="" />
                    <img src="../../../icons/visa-card.svg" alt="" />
                  </div>
                </div>
              </div>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
