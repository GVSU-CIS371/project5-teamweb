<template>
  <v-container>
    <v-row>
      <v-col
        v-for="product in bestSellers"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <!-- Pass product data, expandedProducts, and toggleExpanded to the store-item component -->
        <store-item
          :product="product"
          :expanded-products="expandedProducts"
          :toggle-expanded="toggleExpanded"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";
import { useProductStore } from "../stores/ProductStore";
import StoreItem from "../components/StoreItem.vue"; // Import the StoreItem component

const productStore = useProductStore();
productStore.init();

const expandedProducts = reactive<{ [key: string]: boolean }>({});

const toggleExpanded = (productId: string) => {
  expandedProducts[productId] = !expandedProducts[productId];
};

const bestSellers = computed(() => productStore.filterByRating(4.5));
</script>
