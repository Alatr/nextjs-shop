import { useContext, KeyboardEvent, useState } from "react";
import { AppContext } from "../../context/app.context";
import { uniqueId } from "lodash";
import { List, ListSubheader, ListItemText } from "@mui/material";

import Icon from "@mdi/react";
import { TOOLBAR_ICON_SIZE } from "../../src/constants";
import Link from "next/link";
import styles from "./Menu.module.css";
import cn from "classnames";
import { firstLevelMenu } from "../../helpers/helpers";

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
      {Object.keys(firstLevelMenu).map((category, i) => (
        <Link key={uniqueId()} href={`/${category}`}>
          <a
            className={cn(styles.firstLevel, {
              [styles.firstLevelActive]: i == firstCategory,
            })}
          >
            <Icon
              size={TOOLBAR_ICON_SIZE}
              path={firstLevelMenu[category]?.icon}
            />
            <ListItemText primary={category} />
          </a>
        </Link>
      ))}
    </List>
  );
};
