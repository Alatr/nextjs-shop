import axios from "axios";
import { uniqueId } from "lodash";
import { GetStaticProps } from "next";
import { useState } from "react";
import { Htag, Button, Rating } from "../components";
import { API } from "../src/api-routes";
import { MenuItem } from "../interfaces/menu.interface";
import { withLayout } from "../layout/Layout";

function Home({ menu, firstCategory }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  console.log({ menu, firstCategory });

  return <div></div>;
}
export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const urlCategories = `${process.env.NEXT_PUBLIC_DOMAIN}/products/categories`;

  const { data: menu } = await axios.get<string[]>(urlCategories);
  console.log(123, menu);

  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: string[];
  firstCategory: number;
}
