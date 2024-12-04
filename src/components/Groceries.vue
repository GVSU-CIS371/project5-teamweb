<template>
  <v-container>
    <v-row>
      <v-col
        v-for="product in groceries"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
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
import StoreItem from "./storeitem.vue"; // Import the reusable component

const productStore = useProductStore();
productStore.init();

const expandedProducts = reactive<{ [key: string]: boolean }>({});

const toggleExpanded = (productId: string) => {
  expandedProducts[productId] = !expandedProducts[productId];
};

const groceries = computed(() => productStore.filterByCategory("Groceries"));
</script>
