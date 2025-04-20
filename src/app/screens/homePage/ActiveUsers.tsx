import React from "react";
import { Container, Box, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";

const activeUsers = [
  { memberNick: "Martin", memberImage: "/img/martin.webp" },
  { memberNick: "Justin", memberImage: "/img/justin.webp" },
  { memberNick: "Rose", memberImage: "/img/rose.webp" },
  { memberNick: "Nusret", memberImage: "/img/nusret.webp" },
];

export default function ActiveUsers() {
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active Users</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {activeUsers.length !== 0 ? (
                activeUsers.map((ele, index) => {
                  return (
                    <Card key={index} className="card">
                      <CardOverflow>
                        <AspectRatio
                          ratio="1"
                          sx={{
                            borderRadius: "5px",
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 0,
                          }}
                        >
                          <img src={ele.memberImage} alt="" />
                        </AspectRatio>
                        <Stack className="cards-nick">
                          <Typography className="title">
                            {ele.memberNick}
                          </Typography>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New products are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
