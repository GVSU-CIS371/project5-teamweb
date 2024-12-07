<template>
  <v-card class="mx-auto my-4" max-width="344" outlined>
    <!-- Product Image Wrapper -->
    <div class="image-wrapper">
      <!-- Product Image -->
      <v-img :src="product.data.image" height="200px"></v-img>

      <!-- Modify Button on top of the image -->
      <v-btn
        color="orange"
        @click="startEditing"
        class="modify-btn"
        fab
        absolute
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <!-- Delete Button on top of the image -->
      <v-btn
        color="red"
        @click="confirmDelete"
        class="delete-btn"
        fab
        absolute
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>

    <!-- Product Name -->
    <v-card-title class="text-h6 font-weight-bold">
      <v-text-field
        v-if="isEditing"
        v-model="editedProduct.name"
        label="Name"
        outlined
        dense
      />
      <span v-else>{{ product.data.name }}</span>
    </v-card-title>

    <!-- Product Category with Colored Icon -->
    <v-card-subtitle class="grey--text text--darken-1 d-flex align-center">
      <v-icon
        :color="getCategoryColor(isEditing ? editedProduct.category : product.data.category)"
        small
        class="mr-1"
      >
        {{ getCategoryIcon(isEditing ? editedProduct.category : product.data.category) }}
      </v-icon>
      <v-select
        v-if="isEditing"
        v-model="editedProduct.category"
        :items="categories"
        label="Category"
        outlined
        dense
      />
      <span v-else>{{ product.data.category }}</span>
    </v-card-subtitle>

    <!-- Product Details -->
    <v-card-text>
      <!-- Price -->
      <div class="my-2 d-flex align-center">
        <v-icon color="orange darken-1" small class="mr-1">
          mdi-currency-usd
        </v-icon>
        <strong>Price:</strong>
        <v-text-field
          v-if="isEditing"
          v-model="editedProduct.price"
          type="number"
          label="Price"
          outlined
          dense
        />
        <span v-else>\${{ product.data.price.toFixed(2) }}</span>
      </div>

      <!-- Rating -->
      <div class="d-flex align-center">
        <v-icon color="purple darken-3" small class="mr-1">
          mdi-star
        </v-icon>
        <strong>Rating:</strong>
        <v-text-field
          v-if="isEditing"
          v-model="editedProduct.rating"
          type="number"
          min="1"
          max="5"
          label="Rating"
          outlined
          dense
        />
        <span v-else>{{ product.data.rating }} / 5</span>
      </div>

      <!-- Stock -->
      <div v-if="isEditing" class="my-2 d-flex align-center">
        <v-text-field
          v-model="editedProduct.stock"
          type="number"
          label="Stock"
          outlined
          dense
        />
      </div>

      <!-- Description -->
      <div v-if="isEditing" class="my-2 d-flex align-center">
        <v-textarea
          v-model="editedProduct.description"
          label="Description"
          outlined
          dense
        />
      </div>

      <!-- Image -->
      <div v-if="isEditing" class="my-2 d-flex align-center">
        <v-text-field
          v-model="editedProduct.image"
          label="Image URL"
          outlined
          dense
        />
      </div>
    </v-card-text>

    <!-- Actions -->
   <!-- Actions -->
<v-card-actions>
  <v-row v-if="isEditing">
    <v-col cols="6">
      <!-- Cancel Button -->
      <v-btn
        color="grey"
        @click="cancelEdit"
        block
      >
        <v-icon left>mdi-close</v-icon> Cancel
      </v-btn>
    </v-col>
    <v-col cols="6">
      <!-- Save Button -->
      <v-btn
        color="green"
        @click="updateItem"
        block
      >
        <v-icon left>mdi-check</v-icon> update
      </v-btn>
    </v-col>
  </v-row>

  <!-- View Details Button (non-editing state) -->
  <v-btn
    v-if="!isEditing"
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
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getFirestore, doc, deleteDoc, updateDoc } from "firebase/firestore"; // Firestore imports
import { useRouter } from "vue-router";

interface Product {
  id: string;
  data: {
    image: string;
    name: string;
    category: string;
    price: number;
    rating: number;
    description: string;
    stock: number;
  };
}

const props = defineProps({
  product: Object as () => Product,
  expandedProducts: Object as () => { [key: string]: boolean },
  toggleExpanded: Function,
});

const categories = ["Electronics", "Clothing", "Groceries", "Best Seller"]; // Example categories
let isEditing = ref(false); // Flag for edit mode

const editedProduct = ref({ ...props.product.data }); // Copy of the original product data for editing
const router = useRouter();

// Start editing mode
const startEditing = () => {
  isEditing.value = true;
};

// Cancel editing mode
const cancelEdit = () => {
  isEditing.value = false;
  editedProduct.value = { ...props.product.data }; // Reset to original values
};

// Update the product details
const updateItem = async () => {
  if (window.confirm("Are you sure you want to update this item?")) {
    await saveItemChanges();
  }
};

// Save the updated item to Firestore
const saveItemChanges = async () => {
  const db = getFirestore();
  const productRef = doc(db, "products", props.product.id);
  try {
    await updateDoc(productRef, editedProduct.value);
    isEditing.value = false; // Exit editing mode
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// Confirm deletion
const confirmDelete = () => {
  if (window.confirm("Are you sure you want to delete this item?")) {
    deleteItem();
  }
};

// Delete the item from Firestore
const deleteItem = async () => {
  const db = getFirestore();
  const productRef = doc(db, "products", props.product.id);
  try {
    await deleteDoc(productRef);
    console.log("Document successfully deleted!");
    // Optionally, navigate away after deletion
    router.push("/"); // Redirect to home page or another page
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
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
      return "blue darken-1";
    case "Groceries":
      return "green darken-1";
    default:
      return "grey";
  }
};
</script>

<style scoped>
.image-wrapper {
  position: relative;
}

.modify-btn, .delete-btn {
  position: absolute;
  top: 10px;
  z-index: 10;
}

.delete-btn {
  right: 10px;
}
</style>
