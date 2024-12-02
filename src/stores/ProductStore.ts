import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [] as ProductDoc[], // Initial state as an empty array
  }),
  actions: {
    // Initialize products with the predefined data
    init() {
      this.products = initProducts;
    },

    // Filter products by category
    filterByCategory(category: string) {
      return this.products.filter((product) => product.data.category === category);
    },

    // Filter products by minimum rating
    filterByRating(minRating: number) {
      return this.products.filter((product) => product.data.rating >= minRating);
    },
  },
});
