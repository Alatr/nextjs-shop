import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React, { useEffect, useReducer } from "react";
import axios from "axios";
import cn from "classnames";
import { ParsedUrlQuery } from "querystring";
import { Box } from "@mui/system";

import { withLayout } from "../../layout/Layout";
import { ProductCharacteristic } from "../../interfaces/product.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import styles from "../../layout/Layout.module.css";
import { API } from "../../src/api-routes";
import Product from "../../components/Card/Card";
import { Sort, SortEnum, sortReducer } from "../../components/Sort/Sort";

function Category({ products = [] }: CategoryProps): JSX.Element {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    { products, sort: SortEnum.Rating }
  );

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  useEffect(() => {
    dispatchSort({ type: "reset", initialState: products });
  }, [products]);
  return (
    <>
      <Sort setSort={setSort} sort={sort} />
      <Box className={cn(styles.productList)} sx={{ width: "100%" }}>
        {sortedProducts.map(
          ({
            image,
            description,
            title,
            id,
            price,
            category,
            rating: { rate },
          }) => (
            <Product
              key={id}
              image={image}
              title={title}
              price={price}
              description={description}
              id={id}
              category={category}
              rate={rate}
            />
          )
        )}
      </Box>
    </>
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

// TODO remove menu
interface CategoryProps extends Record<string, unknown> {
  menu: string[];
  firstCategory: number;
  products: ProductCharacteristic[];
}
