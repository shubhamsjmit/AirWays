import { createRouter, createWebHistory } from 'vue-router'
import ECommerce from "@/views/ECommerce/MainComponent.vue";
import Welcome from "@/views/Welcome/Component.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Welcome,
  },
  {
    path: "/bookflight",
    name: "Book Flight",
    component: ECommerce,
  },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
  
export default router
  
