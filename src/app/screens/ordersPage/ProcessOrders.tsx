import TabPanel from "@mui/lab/TabPanel/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import moment from "moment";

export default function ProcessOrders() {
  let numberOfOrders = [1, 2];
  let numberOfFoods = [1, 2, 3];
  return (
    <TabPanel value="2">
      <Stack>
        {numberOfOrders.length !== 0 ? (
          numberOfOrders.map((ele, index) => {
            return (
              <Box key={index} className="order-main-box">
                {numberOfFoods.map((ele, index2) => {
                  return (
                    <Box className="order-main-box-info-container">
                      <div className="ordered-food-container">
                        <div className="ordered-food-name">
                          <img src="../../../img/kebab-fresh.webp" alt="" />
                          <p>Steak</p>
                        </div>
                        <div className="ordered-food-price">
                          <span>$10</span>
                          <img src="../../../icons/close.svg" alt="" />
                          <span>2</span>
                          <img src="../../../icons/pause.svg" alt="" />
                          <span>$20</span>
                        </div>
                      </div>
                    </Box>
                  );
                })}

                <div className="ordered-food-total">
                  <div className="total-numbers">
                    <span>Product price</span>
                    <span>$60</span>
                    <img src="../../../icons/plus.svg" alt="" />
                    <span> Delivery cost</span>
                    <span>$5</span>
                    <img src="../../../icons/pause.svg" alt="" />
                    <span>Total</span>
                    <span>$65</span>
                  </div>

                  <div className="process-order-date-container">
                    <p>{moment().format("YY-MM-DD HH:mm")}</p>
                    <Button
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
                    >
                      to fulfil
                    </Button>
                  </div>
                </div>
              </Box>
            );
          })
        ) : (
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
        )}
      </Stack>
    </TabPanel>
  );
}
