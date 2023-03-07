import React from "react";
import { Container, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UnAurhorizedPage() {
  const navigate = useNavigate();

  return (
    <Container sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <h1>You are unauthorized to view this page </h1>
        <Button variant="contained" color="error" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Stack>
    </Container>
  );
}
