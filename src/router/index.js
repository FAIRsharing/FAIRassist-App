import { createRouter, createWebHistory } from "vue-router";
import { HomeView, SearchRegistryView, ToolsView, TabularRegistryView } from "./routes";

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
    name: "SearchRegistryView",
    path: "/registry/search",
    component: SearchRegistryView,
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
