import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";

export default function PausedOrders() {
  let numberOfOrders = [1, 2];
  let numberOfFoods = [1, 2, 3];
  return (
    <TabPanel value="1">
      <Stack>
        {numberOfOrders.length !== 0 ? (
          numberOfOrders.map((ele, index) => {
            return (
              <Box key={index} className="order-main-box">
                <Box className="order-main-box-info-container">
                  {numberOfFoods.map((ele, index2) => {
                    return (
                      <div key={index2} className="ordered-food-container">
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
                    );
                  })}
                </Box>

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
