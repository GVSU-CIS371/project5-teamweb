<template>
  <v-container>
    <v-row>
      <v-col
        v-for="product in electronics"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <!-- Reuse StoreItem Component -->
        <StoreItem
          :product="product"
          :expandedProducts="expandedProducts"
          :toggleExpanded="toggleExpanded"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";
import { useProductStore } from "../stores/ProductStore";
import StoreItem from "../components/StoreItem.vue"; // Make sure to import StoreItem component

const productStore = useProductStore();
productStore.init();

const expandedProducts = reactive<{ [key: string]: boolean }>({});

const toggleExpanded = (productId: string) => {
  expandedProducts[productId] = !expandedProducts[productId];
};

const electronics = computed(() => productStore.filterByCategory("Electronics"));
</script>
