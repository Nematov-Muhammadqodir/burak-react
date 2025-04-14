import React from "react";
import "../css/app.css";
import { Stack, Container, Box } from "@mui/material";
import Button from "@mui/material/Button";

function App() {
  return (
    <Container maxWidth="xs">
      <Stack spacing={2}>
        <Box
          component="section"
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            border: "1px dashed grey",
            gap: 2,
          }}
        >
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Box>
      </Stack>
    </Container>
  );
}

export default App;
