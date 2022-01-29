import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { withLayout } from "../../layout/Layout";
import axios from "axios";

// import { ProductModel } from "../../interfaces/product.interface";
// import { TopPageComponent } from "../../page-components";
// import { API } from "../../helpers/api";
import Head from "next/head";
// import { Error404 } from "../404";
import { ParsedUrlQuery } from "querystring";
import { ProductCharacteristic } from "../../interfaces/product.interface";
import { API } from "../../src/api-routes";
import {
  Card,
  Box,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Rating,
} from "@mui/material";

function TopPage({
  firstCategory,
  page,
  product: {
    image,
    description,
    title,
    price,
    rating: { rate },
  },
}: TopPageProps): JSX.Element {
  // if (!page || !products) {
  //   return <Error404 />;
  // }

  return (
    <>
      {/* <Head>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="article" />
      </Head> */}
      <Card>
        <Box sx={{ paddingTop: 1 }}>
          <CardMedia
            component="img"
            sx={{ objectFit: "contain" }}
            height="360"
            image={image}
            alt={title}
          />
        </Box>
        <CardContent>
          <Typography noWrap={true} gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            sx={{ marginBottom: 1 }}
            variant="body2"
            color="text.secondary"
          >
            {description}
          </Typography>
          <Rating
            name="read-only"
            sx={{ marginBottom: 1 }}
            value={rate}
            readOnly
          />
          <Box sx={{ display: "block", marginBottom: 1 }}>
            <Chip label={`${price} $`} sx={{ marginRight: 1 }} />
            <Chip label="out of stock" />
          </Box>
        </CardContent>
      </Card>
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

  try {
    const { data: product } = await axios.get<ProductCharacteristic>(
      API.getProduct(params.alias as string)
    );

    return {
      props: {
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
  // menu: MenuItem[];
  // firstCategory: TopLevelCategory;
  // page: TopPageModel;
  product: ProductCharacteristic;
}
