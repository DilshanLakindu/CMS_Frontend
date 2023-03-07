import { List, ListItemButton, ListItemText, Tooltip, Typography, Collapse, ListItem, ListItemIcon } from "@mui/material";

import { pascalCase } from "change-case";

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
  handleClick: () => void;
}

export default function DrawerLink({ label, icon, btn = TextSize.medium, textcolor = "#808080", handleClick }: Props) {
  return (
    <>
      <List
        sx={{
          width: "100%",
        }}
      >
        <Tooltip title={label} placement="right" arrow>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon sx={{ color: textcolor }}>{icon}</ListItemIcon>
              <ListItemText>
                <Typography
                  sx={{
                    color: "#000000",
                    fontSize: btn,
                  }}
                >
                  {pascalCase(label)}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </List>
    </>
  );
}
