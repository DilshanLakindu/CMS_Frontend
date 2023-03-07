import { CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

export default function CustomCirculerProgress() {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
      <CircularProgress />
    </Stack>
  );
}
