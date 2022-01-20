export const API = {
  allCategories: `${process.env.NEXT_PUBLIC_DOMAIN}/products/categories`,
  getByCategory: (category) =>
    `${process.env.NEXT_PUBLIC_DOMAIN}/products/category/${category}`,
};
