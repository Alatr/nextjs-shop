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
import Link from "next/link";
import styles from "./Menu.module.css";
import cn from "classnames";

export interface FirstLevelMenuItem {
  route: string;
  name: string;
  icon: string;
  id: string;
}

export const firstLevelMenu = {
  electronics: {
    route: "electronics",
    label: "electronics",
    id: "electronics",
    icon: mdiTelevisionClassic,
  },
  jewelery: {
    route: "jewelery",
    label: "jewelery",
    id: "jewelery",
    icon: mdiDiamondStone,
  },
  "men's clothing": {
    route: "mens_clothing",
    label: "men's clothing",
    id: "men's clothing",
    icon: mdiTshirtCrew,
  },
  "women's clothing": {
    route: "women_clothing",
    label: "women's clothing",
    id: "women's clothing",
    icon: mdiFaceWomanShimmerOutline,
  },
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
        <Link key={uniqueId()} href={`/${firstLevelMenu[item]?.route}`}>
          <a
            className={cn(styles.firstLevel, {
              [styles.firstLevelActive]: i == firstCategory,
            })}
          >
            <Icon size={TOOLBAR_ICON_SIZE} path={firstLevelMenu[item]?.icon} />
            <ListItemText primary={item} />
          </a>
        </Link>
      ))}
    </List>
  );
};
