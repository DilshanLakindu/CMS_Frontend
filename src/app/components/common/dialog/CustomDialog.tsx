import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface CustomeDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
}

export default function CustomeDialog({ open, setOpen, children, title, maxWidth = "sm" }: CustomeDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //style objects
  const displaywraper = {
    position: "absolute",
    top: 2,
  };

  const iconbtn = {
    "&.MuiIconButton-colorPrimary": {
      color: "#000000",
    },
    "&:hover": {
      backgroundColor: "#e6e6e6",
    },
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      sx={displaywraper}
      maxWidth={maxWidth ? maxWidth : "sm"}
      fullScreen={fullScreen}
      data-testid="dialog"
    >
      <DialogTitle sx={{ p: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <IconButton color="primary" sx={iconbtn} onClick={() => setOpen(false)} size="large">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ mt: 1 }}>{children}</DialogContent>
    </Dialog>
  );
}
