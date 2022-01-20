import CoursesIcon from "./icons/courses.svg";
import ServicesIcon from "./icons/services.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";
import { TopLevelCategory } from "../interfaces/page.interface";
import {
  mdiTelevisionClassic,
  mdiFaceWomanShimmerOutline,
  mdiTshirtCrew,
  mdiDiamondStone,
} from "@mdi/js";
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
  // "men's clothing": {
  //   route: "mens_clothing",
  //   label: "men's clothing",
  //   id: "men's clothing",
  //   icon: mdiTshirtCrew,
  // },
  // "women's clothing": {
  //   route: "women_clothing",
  //   label: "women's clothing",
  //   id: "women's clothing",
  //   icon: mdiFaceWomanShimmerOutline,
  // },
};

export const priceRu = (price: number): string =>
  price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .concat(" ₽");

export const declOfNum = (
  number: number,
  titles: [string, string, string]
): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};
