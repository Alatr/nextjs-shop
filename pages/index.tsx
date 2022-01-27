import { Box } from "@mui/material";
import axios from "axios";
import { uniqueId } from "lodash";
import { GetStaticProps } from "next";
import { useState } from "react";
import Product from "../components/Card/Card";
import { ProductCharacteristic } from "../interfaces/product.interface";
// import { API } from "../src/api-routes";
// import { MenuItem } from "../interfaces/menu.interface";
import { withLayout } from "../layout/Layout";
import { API } from "../src/api-routes";
import cn from "classnames";

import styles from "../layout/Layout.module.css";

function Home({ menu, firstCategory, products }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <Box className={cn(styles.productList)} sx={{ width: "100%" }}>
      {products.map(({ image, description, title, id, price }) => (
        <Product
          key={id}
          image={image}
          title={title}
          price={price}
          description={description}
        />
      ))}
    </Box>
  );
}
export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = -1;

  const urlCategories = `${process.env.NEXT_PUBLIC_DOMAIN}/products/categories`;
  const { data: menu } = await axios.get<string[]>(urlCategories);

  const { data: products } = await axios.get<ProductCharacteristic[]>(
    API.allProducts
  );

  return {
    props: {
      menu,
      firstCategory,
      products,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: string[];
  firstCategory: number;
  products: ProductCharacteristic[];
}
