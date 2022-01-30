import styles from "./Sort.module.css";
import SortIcon from "./sort.svg";
import cn from "classnames";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { Tabs, Tab } from "@mui/material";
import { firstLevelMenu } from "../../helpers/helpers";
import { TOOLBAR_ICON_SIZE } from "../../src/constants";
import Icon from "@mdi/react";
import { mdiCurrencyUsd, mdiStarCheckOutline } from "@mdi/js";
import { ProductCharacteristic } from "../../interfaces/product.interface";

export interface SortProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sort: SortEnum;
  setSort: (sort: SortEnum) => void;
}

export enum SortEnum {
  Rating,
  Price,
}

export type SortActions =
  | { type: SortEnum }
  | { type: SortEnum.Rating }
  | { type: "reset"; initialState: ProductCharacteristic[] };

export interface SortReducerState {
  sort: SortEnum;
  products: ProductCharacteristic[];
}

export const sortReducer = (
  state: SortReducerState,
  action: SortActions
): SortReducerState => {
  switch (action.type) {
    case SortEnum.Rating:
      return {
        sort: SortEnum.Rating,
        products: state.products.sort((a, b) =>
          a.rating.rate > b.rating.rate ? -1 : 1
        ),
      };
    case SortEnum.Price:
      return {
        sort: SortEnum.Price,
        products: state.products.sort((a, b) => (a.price > b.price ? 1 : -1)),
      };
    case "reset":
      return {
        sort: SortEnum.Rating,
        products: action.initialState,
      };
    default:
      throw new Error("sort type error");
  }
};

export const Sort = ({
  sort,
  setSort,
  className,
  ...props
}: SortProps): JSX.Element => {
  const handleChange = (
    event: React.SyntheticEvent,
    newSortValue: SortEnum
  ) => {
    setSort(newSortValue);
    console.log({ newSortValue }, SortEnum);
  };
  return (
    <div className={styles.wrapper} {...props}>
      <Tabs onChange={handleChange} value={sort}>
        <Tab
          icon={<Icon size={TOOLBAR_ICON_SIZE} path={mdiCurrencyUsd} />}
          label="Price"
          value={SortEnum.Price}
        />
        <Tab
          icon={<Icon size={TOOLBAR_ICON_SIZE} path={mdiStarCheckOutline} />}
          label="Rating"
          value={SortEnum.Rating}
        />
      </Tabs>
    </div>
  );
};
