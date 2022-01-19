import { useContext, KeyboardEvent, useState } from "react";
import { AppContext } from "../../context/app.context";
import { uniqueId } from "lodash";
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  mdiTelevisionClassic,
  mdiFaceWomanShimmerOutline,
  mdiTshirtCrew,
  mdiDiamondStone,
} from "@mdi/js";
import Icon from "@mdi/react";
import { TOOLBAR_ICON_SIZE } from "../../src/constants";

const iconMap = {
  electronics: mdiTelevisionClassic,
  jewelery: mdiDiamondStone,
  "men's clothing": mdiTshirtCrew,
  "women's clothing": mdiFaceWomanShimmerOutline,
};

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Categories
        </ListSubheader>
      }
    >
      {menu.map((item, i) => (
        <ListItemButton key={uniqueId()} selected={i === firstCategory}>
          <ListItemIcon>
            <Icon size={TOOLBAR_ICON_SIZE} path={iconMap[item]} />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItemButton>
      ))}
    </List>
  );
};
