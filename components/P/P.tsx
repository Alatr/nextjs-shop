import { PProps } from "./P.props";
import styles from "./P.module.css";
import cn from "classnames";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

interface PProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  size?: "s" | "m" | "l";
  children: ReactNode;
}

export const P = ({
  size = "m",
  children,
  className,
  ...props
}: PProps): JSX.Element => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.s]: size == "s",
        [styles.m]: size == "m",
        [styles.l]: size == "l",
      })}
      {...props}
    >
      {children}
    </p>
  );
};
