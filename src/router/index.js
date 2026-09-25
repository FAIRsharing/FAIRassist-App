import { createRouter, createWebHistory } from "vue-router";
import { HomeView, BrowseRegistryView, ToolsView } from "./routes";

let routes = [
  {
    name: "HomeView",
    path: "/",
    component: HomeView,
  },
  {
    name: "ToolsView",
    path: "/tools",
    component: ToolsView,
  },
  {
    name: "BrowseRegistryView",
    path: "/registry/browse",
    component: BrowseRegistryView,
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
