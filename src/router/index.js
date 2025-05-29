import { createRouter, createWebHistory } from "vue-router";
import { HomeView, RegistryView } from "./routes";

let routes = [
  {
    name: "HomeView",
    path: "/",
    component: HomeView,
  },
  {
    name: "RegistryView",
    path: "/registry",
    component: RegistryView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }; // always scroll to top
  },
});

export default router;
