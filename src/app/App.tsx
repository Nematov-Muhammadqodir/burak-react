import React from "react";
import "../css/app.css";
import { Stack, Container, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { RippleBadge } from "./MaterialTheme/styled";

function App() {
  return (
    <Container sx={{ background: "orange" }}>
      <Stack flexDirection={"column"}>
        <Box sx={{ my: 4 }}>
          <Typography component={"h2"} align="center">
            These are MUI Button components
          </Typography>
        </Box>
        <Box>
          <RippleBadge badgeContent={4}>
            <Button variant="contained">Contained</Button>
          </RippleBadge>
        </Box>
      </Stack>
    </Container>
  );
}

export default App;
