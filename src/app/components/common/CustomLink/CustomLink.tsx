import { ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import React from "react";

export enum TextSize {
  small = "0.8rem",
  medium = "1rem",
  large = "1.5rem",
}
interface Props {
  label: string;
  icon: JSX.Element;
  btn?: TextSize;
  textcolor?: string;
  onClick: () => void;
  drawerstatus?: boolean;
}

function CustomLink({ drawerstatus, label, icon, btn = TextSize.medium, textcolor = "#808080", onClick }: Props) {
  return (
    <Tooltip title={label} placement="right" arrow>
      <ListItem onClick={onClick} sx={{ p: 0 }}>
        <ListItemButton>
          <ListItemIcon sx={{ color: textcolor }}>{icon}</ListItemIcon>
          <ListItemText>
            <Typography
              sx={{
                color: textcolor,
                fontSize: btn,
              }}
            >
              {label}
            </Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
}

export default CustomLink;
