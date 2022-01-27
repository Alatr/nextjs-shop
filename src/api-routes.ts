const makeURL = (path: string) =>
  new URL(path, process.env.NEXT_PUBLIC_DOMAIN)?.href;

export const API = {
  allCategories: `${process.env.NEXT_PUBLIC_DOMAIN}/products/categories`,
  allProducts: `${process.env.NEXT_PUBLIC_DOMAIN}/products`,
  getByCategory: (category: string) =>
    makeURL(`/products/category/${category}`),
};
