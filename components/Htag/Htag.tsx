import { ReactNode } from "react";
import styles from "./Htag.module.css";

interface HtagProps {
  lvl: 1 | 2 | 3;
  children: ReactNode;
}

export const Htag = ({ lvl, children }: HtagProps): JSX.Element => {
  switch (true) {
    case lvl === 1:
      return <h1 className={styles.h1}>{children}</h1>;
    case lvl === 2:
      return <h2 className={styles.h2}>{children}</h2>;
    case lvl === 3:
      return <h3 className={styles.h3}>{children}</h3>;
    default:
      return <></>;
  }
};
