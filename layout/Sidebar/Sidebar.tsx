import styles from "./Sidebar.module.css";
import cn from "classnames";
import { Menu } from "../Menu/Menu";

export const Sidebar = ({ className, ...props }): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Menu />
    </div>
  );
};
