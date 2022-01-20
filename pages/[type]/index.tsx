import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { withLayout } from "../../layout/Layout";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import {
  TopLevelCategory,
  TopPageModel,
} from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { API } from "../../src/api-routes";

function TopPage({ products }: TopPageProps): JSX.Element {
  return (
    <ul>
      {products.map((el) => (
        <li>{el.title}</li>
      ))}
    </ul>
  );
}
// https://fakestoreapi.com/products/category/jewelery
// {
//   id:5,
//   title:'...',
//   price:'...',
//   category:'jewelery',
//   description:'...',
//   image:'...'
// }
export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(firstLevelMenu).map((m) => "/" + m),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { data: products } = await axios.get<any[]>(
    API.getByCategory(params.type)
  );
  // console.log("@@@", { menu });

  return {
    props: {
      products,
    },
  };
};

interface TopPageProps extends Record<string, unknown> {
  menu: any[];
}
