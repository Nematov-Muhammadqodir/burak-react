import React from "react";
import { Container, Box, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";

import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { useSelector } from "react-redux";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";

const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active Users</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member, index) => {
                  const imagePath = `${serverApi}/${member.memberImage}`;
                  return (
                    <Card key={member._id} className="card">
                      <CardOverflow>
                        <AspectRatio
                          ratio="1"
                          sx={{
                            borderRadius: "5px",
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 0,
                          }}
                        >
                          <img src={imagePath} alt="" />
                        </AspectRatio>
                        <Stack className="cards-nick">
                          <Typography className="title">
                            {member.memberNick}
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
