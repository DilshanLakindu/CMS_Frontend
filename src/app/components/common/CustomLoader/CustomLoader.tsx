import React from "react";
import { Stack, CircularProgress } from "@mui/material";
export default function CustomLoader() {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
      <CircularProgress color="inherit" />
    </Stack>
  );
}
