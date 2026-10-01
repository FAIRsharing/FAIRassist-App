import { createRouter, createWebHistory } from "vue-router";
import { HomeView, BrowseRegistryView, ToolsView, TabularRegistryView } from "./routes";

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
    name: "TabularRegistryView",
    path: "/registry",
    component: TabularRegistryView,
  },
  {
    name: "BrowseRegistryView",
    path: "/registry/search",
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
