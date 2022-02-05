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
