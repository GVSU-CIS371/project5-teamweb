import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { getApp, initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1JYqreXDYHGEuh6bHagbN79iFBwhx8XU",
  authDomain: "project4-teamweb.firebaseapp.com",
  projectId: "project4-teamweb",
  storageBucket: "project4-teamweb.firebasestorage.app",
  messagingSenderId: "327380136074",
  appId: "1:327380136074:web:7d5ad0cd479e9d1dd13d73",
  measurementId: "G-QE3Q4RPQW4"
};

// Initialize Firebase
const app = getApp.length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [] as ProductDoc[], // Initial state as an empty array
  }),
  actions: {
    async init() {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);

      if (productsSnapshot.empty) {
        // Firestore is empty, initialize with initProducts
        for (const product of initProducts) {
          await setDoc(doc(productsCollection, product.id), product.data);
        }
        this.products = initProducts;
      } else {
        // Load data from Firestore
        this.products = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data() as ProductDoc["data"]
        }));
      }
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