<template>
  <v-app>
    <v-app-bar class="bg-blue-darken-4">
      <v-toolbar-title>My Online Store</v-toolbar-title>
      
      <!-- Create Item Button -->
      <v-btn class="mx-5" color="green" @click="createItem">
        <v-icon>mdi-plus</v-icon> Create Item
      </v-btn>

      <v-btn class="mx-5" v-for="link in links" :key="link.text" :to="link.to">
        <v-icon>{{ link.icon }}</v-icon>
        {{ link.text }}
      </v-btn>
    </v-app-bar>

    <v-main class="bg-blue-lighten-5">
      <router-view v-slot="{ Component }">
        <transition name="shrink-explode">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <v-footer color="primary" app>
      © 2023 My Online Store. All rights reserved.
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Firebase Firestore imports
import { useRouter } from "vue-router";

const links = ref([
  { text: "Home", to: "/", icon: "mdi-home" },
  { text: "Electronics", to: "/electronics", icon: "mdi-laptop" },
  { text: "Clothing", to: "/clothing", icon: "mdi-tshirt-crew" },
  { text: "Groceries", to: "/groceries", icon: "mdi-cart" },
  { text: "Best Seller", to: "/bestseller", icon: "mdi-cash-register" },
]);

const router = useRouter();

// Function to handle item creation
const createItem = async () => {
  const item = {
    name: "New Product",
    category: "Electronics",
    price: 99.99,
    rating: 4.5,
    description: "This is a newly added product.",
    image: "https://via.placeholder.com/150",
  };

  if (window.confirm("Are you sure you want to add this item?")) {
    await addItemToFirestore(item);
  }
};

// Function to add the item to Firestore
const addItemToFirestore = async (item: any) => {
  const db = getFirestore();
  try {
    const docRef = await addDoc(collection(db, "products"), item);
    console.log("Document written with ID: ", docRef.id);
    router.push("/"); // Redirect to homepage or another route after adding item
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
</script>
