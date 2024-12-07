import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./components/Home.vue";
import Electronics from "./components/Electronics.vue";
import Groceries from "./components/Groceries.vue";
import BestSeller from "./components/BestSeller.vue";
import Clothing from "./components/Clothing.vue";


const routes = [
  {
    path: "/",
    name: "home",
    props: true,
    component: HomeView,
  },
  {
    path: "/clothing",
    name: "Clothing",
    props: true,
    component: Clothing,
  },
  {
    path: "/electronics",
    name: "Electronics",
    props: true,
    component: Electronics,
  },
  {
    path: "/groceries",
    name: "Groceries",
    props: true,
    component: Groceries,
  },
  {
    path: "/bestseller",
    name: "BestSeller",
    props: true,
    component: BestSeller,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;