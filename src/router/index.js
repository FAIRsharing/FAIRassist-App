import { createRouter, createWebHistory } from "vue-router";
import { HomeView } from "./routes";

let routes = [
  {
    name: "HomeView",
    path: "/",
    component: HomeView,
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
