import styles from "./Footer.module.css";
import cn from "classnames";
import { format } from "date-fns";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface FooterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div>Alatr © 2021 - {format(new Date(), "yyyy")} all rights reserved</div>
    </footer>
  );
};
