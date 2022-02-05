import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
// import Head from "next/head";

import { withLayout } from "../../layout/Layout";
import { ProductCharacteristic } from "../../interfaces/product.interface";
import { API } from "../../src/api-routes";
import { firstLevelMenu } from "../../helpers/helpers";
import { TopPageComponent } from "../../page-components/TopPageComponent/TopPageComponent";

function TopPage({ product }: TopPageProps): JSX.Element {
  return (
    <>
      {/* <Head>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="article" />
      </Head> */}
      <TopPageComponent product={product} />
    </>
  );
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: products } = await axios.get<ProductCharacteristic[]>(
    API.allProducts
  );

  return {
    paths: products.map(({ category, id }) => `/${category}/${id}`),
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

  const firstCategory = Object.keys(firstLevelMenu).findIndex(
    (category) => category === params.type
  );

  if (firstCategory === -1) {
    return {
      notFound: true,
    };
  }

  try {
    const { data: product } = await axios.get<ProductCharacteristic>(
      API.getProduct(params.alias as string)
    );

    return {
      props: {
        menu: [],
        firstCategory,
        product,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

interface TopPageProps extends Record<string, unknown> {
  menu: string[];
  firstCategory: number;
  product: ProductCharacteristic;
}
