import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SegmentIcon from "@mui/icons-material/Segment";
import { AppBar, Button, IconButton, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import SourceIcon from "@mui/icons-material/Source";
import DatasetIcon from "@mui/icons-material/Dataset";
import CustomLink from "../../common/CustomLink/CustomLink";
import { useDispatch } from "react-redux/es/exports";
import { setDrawerState, setIsContentTypeBuilder, setIsContetntManager } from "src/app/Redux/mainDrawerSlice";
import { TextSize } from "./DrawerLink/DrawerLink";

const drawerWidth = 220;
const drawerWidthClose = 60;

export default function CustomDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const handleDrawerClose = () => {
    setOpen(!open);
    dispatch(setDrawerState(!open));
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: open ? drawerWidth : drawerWidthClose,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : drawerWidthClose,
              boxSizing: "border-box",
              transition: theme.transitions.create("width", {
                easing: open ? theme.transitions.easing.sharp : theme.transitions.easing.sharp,
                duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
              }),
            },
          }}
          open={open}
          variant="permanent"
          anchor="left"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              padding: theme.spacing(0, 1),
              ...theme.mixins.toolbar,
            }}
          >
            {open ? (
              <Typography align="left" variant="h6" noWrap component="div">
                BackOffice
              </Typography>
            ) : null}
            <IconButton onClick={handleDrawerClose}>
              <SegmentIcon />
            </IconButton>
          </Box>

          <Divider />
          <List>
            <Box sx={{ mt: 3, mb: 3 }}>
              <CustomLink
                label="Content Manager"
                icon={<DatasetIcon />}
                btn={TextSize.small}
                textcolor="#000000"
                onClick={() => dispatch(setIsContetntManager(true))}
              />
            </Box>
            <Box sx={{ mt: 3, mb: 3 }}>
              <CustomLink
                label="Content type builder"
                icon={<SourceIcon />}
                btn={TextSize.small}
                textcolor="#000000"
                onClick={() => dispatch(setIsContentTypeBuilder(true))}
              />
            </Box>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            width: `calc(100% - ${open ? drawerWidth : drawerWidthClose}px)`,
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
