import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { withLayout } from "../../layout/Layout";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import {
  TopLevelCategory,
  TopPageModel,
} from "../../interfaces/page.interface";
import { ProductCharacteristic } from "../../interfaces/product.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { API } from "../../src/api-routes";

function Category({ products }: CategoryProps): JSX.Element {
  console.log("@@@@@@@@@@@", { products });

  return (
    <ul>
      {products.map((el) => (
        <li>{el.title}</li>
      ))}
    </ul>
  );
}

export default withLayout(Category);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(firstLevelMenu).map(
    (category) => `/${firstLevelMenu[category]}`
  );

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
    (category) => firstLevelMenu[category] === params.type
  );

  if (firstCategory === -1) {
    return {
      notFound: true,
    };
  }

  try {
    const { data: products } = await axios.get<ProductCharacteristic[]>(
      API.getByCategory(params.type)
    );

    const { data: menu } = await axios.get<string[]>(API.allCategories);
    console.log("@@@@@@@@@@@", { params, menu });

    return {
      props: {
        menu,
        products: [1],
        firstCategory,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

interface CategoryProps extends Record<string, unknown> {
  menu: string[];
  products: ProductCharacteristic[];
  firstCategory: number;
}
