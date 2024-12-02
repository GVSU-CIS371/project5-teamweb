<template>
  <v-container v-if="product">
    <v-card class="mx-auto my-5" max-width="600" outlined>
      <!-- Product Name -->
      <v-card-title class="text-h5 font-weight-bold">
        {{ product!.data.name }}
      </v-card-title>
      <!-- Product Category with Colored Icon -->
      <v-card-subtitle class="grey--text text--darken-1 d-flex align-center">
        <v-icon
          :color="getCategoryColor(product!.data.category)"
          small
          class="mr-1"
        >
          {{ getCategoryIcon(product!.data.category) }}
        </v-icon>
        {{ product!.data.category }}
      </v-card-subtitle>
      <!-- Product Description and Details -->
      <v-card-text>
        <!-- Description -->
        <p class="my-3 text-body-1">{{ product!.data.description }}</p>
        <!-- Price -->
        <div class="my-2 d-flex align-center">
          <v-icon color="orange darken-1" small class="mr-1">
            mdi-currency-usd
          </v-icon>
          <strong>Price:</strong>
          ${{ product!.data.price.toFixed(2) }}
        </div>
        <!-- Rating -->
        <div class="my-2 d-flex align-center">
          <v-icon color="yellow darken-3" small class="mr-1">
            mdi-star
          </v-icon>
          <strong>Rating:</strong>
          {{ product!.data.rating }} / 5
        </div>
        <!-- Stock -->
        <div class="my-2 d-flex align-center">
          <v-icon color="purple darken-2" small class="mr-1">
            mdi-warehouse
          </v-icon>
          <strong>Stock:</strong>
          {{ product!.data.stock }}
        </div>
      </v-card-text>
      <!-- Add to Cart Button -->
      <v-card-actions>
        <v-btn color="success" @click="addToCart">
          <v-icon left>mdi-cart-plus</v-icon>
          Add to Cart
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "../stores/ProductStore";
import { useRoute } from "vue-router";
import type { ProductDoc } from "../types/product";

const product = ref<ProductDoc | null>(null);

const productStore = useProductStore();
const route = useRoute();

onMounted(() => {
  const productId = route.params.id as string;
  productStore.init(); // Ensure the store is initialized
  product.value = productStore.products.find((item) => item.id === productId) || null;
});

const addToCart = () => {
  alert("Added to cart!");
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Electronics":
      return "mdi-laptop";
    case "Clothing":
      return "mdi-tshirt-crew";
    case "Groceries":
      return "mdi-food-apple";
    default:
      return "mdi-tag";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Electronics":
      return "blue darken-2";
    case "Clothing":
      return "pink darken-1";
    case "Groceries":
      return "green darken-1";
    default:
      return "grey";
  }
};
</script>
