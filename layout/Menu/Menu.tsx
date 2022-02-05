import Icon from "@mdi/react";
import { List, ListSubheader, ListItemText } from "@mui/material";
import { useContext } from "react";
import { uniqueId } from "lodash";
import Link from "next/link";
import cn from "classnames";

import { TOOLBAR_ICON_SIZE } from "../../src/constants";
import styles from "./Menu.module.css";
import { firstLevelMenu } from "../../helpers/helpers";
import { AppContext } from "../../context/app.context";

export const Menu = (): JSX.Element => {
  const { firstCategory } = useContext(AppContext);

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
