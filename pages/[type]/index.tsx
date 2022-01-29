import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { withLayout } from "../../layout/Layout";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import {
  TopLevelCategory,
  TopPageModel,
} from "../../interfaces/page.interface";
import cn from "classnames";
import { ProductCharacteristic } from "../../interfaces/product.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { API } from "../../src/api-routes";
import Product from "../../components/Card/Card";
import { Grid } from "@mui/material";
import { Item } from "framer-motion/types/components/Reorder/Item";
import { Box } from "@mui/system";
import styles from "../../layout/Layout.module.css";

function Category({ products = [] }: CategoryProps): JSX.Element {
  return (
    <Box className={cn(styles.productList)} sx={{ width: "100%" }}>
      {products.map(({ image, description, title, id, price, category }) => (
        <Product
          key={id}
          image={image}
          title={title}
          price={price}
          description={description}
          id={id}
          category={category}
        />
      ))}
    </Box>
  );
}

export default withLayout(Category);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(firstLevelMenu).map((category) => `/${category}`);

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const firstCategory = Object.keys(firstLevelMenu).findIndex(
    (category) => category === params.type
  );

  if (firstCategory === -1) {
    return {
      notFound: true,
    };
  }

  const { data: products } = await axios.get<ProductCharacteristic[]>(
    API.getByCategory(params.type as string)
  );

  const { data: menu } = await axios.get<string[]>(API.allCategories);

  return {
    props: {
      menu,
      products,
      firstCategory,
    },
  };
};

interface CategoryProps extends Record<string, unknown> {
  menu: string[];
  products: ProductCharacteristic[];
  firstCategory: number;
}
