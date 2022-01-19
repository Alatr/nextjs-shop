import styles from "./Header.module.css";
import cn from "classnames";

import { DetailedHTMLProps, HTMLAttributes } from "react";

interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  return (
    <header className={cn(className, styles.header)} {...props}>
      {"header"}
    </header>
  );
};
