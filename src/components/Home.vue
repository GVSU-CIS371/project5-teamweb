<template>
  <v-container>
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <v-card class="mx-auto my-4" max-width="344" outlined>
          <!-- Product Image -->
          <v-img :src="product.data.image" height="200px"></v-img>
          <!-- Product Name -->
          <v-card-title class="text-h6 font-weight-bold">
            {{ product.data.name }}
          </v-card-title>
          <!-- Product Category with Colored Icon -->
          <v-card-subtitle class="grey--text text--darken-1 d-flex align-center">
            <v-icon
              :color="getCategoryColor(product.data.category)"
              small
              class="mr-1"
            >
              {{ getCategoryIcon(product.data.category) }}
            </v-icon>
            {{ product.data.category }}
          </v-card-subtitle>
          <!-- Product Details -->
          <v-card-text>
            <!-- Price -->
            <div class="my-2 d-flex align-center">
              <v-icon color="orange darken-1" small class="mr-1">
                mdi-currency-usd
              </v-icon>
              <strong>Price:</strong>
              ${{ product.data.price.toFixed(2) }}
            </div>
            <!-- Rating -->
            <div class="d-flex align-center">
              <v-icon color="yellow darken-3" small class="mr-1">
                mdi-star
              </v-icon>
              <strong>Rating:</strong>
              {{ product.data.rating }} / 5
            </div>
          </v-card-text>
          <!-- View Details Button -->
          <v-card-actions>
            <v-btn
              color="primary"
              block
              @click="toggleExpanded(product.id)"
            >
              <v-icon left>
                {{ expandedProducts[product.id] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
              </v-icon>
              {{ expandedProducts[product.id] ? 'Hide Details' : 'View Details' }}
            </v-btn>
          </v-card-actions>
          <!-- Description (conditionally rendered) -->
          <v-expand-transition>
            <v-card-text v-if="expandedProducts[product.id]">
              {{ product.data.description }}
            </v-card-text>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";
import { useProductStore } from "../stores/ProductStore";

const productStore = useProductStore();

productStore.init();

const products = computed(() => productStore.products);

const expandedProducts = reactive<{ [key: string]: boolean }>({});

const toggleExpanded = (productId: string) => {
  expandedProducts[productId] = !expandedProducts[productId];
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