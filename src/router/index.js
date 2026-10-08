import { createRouter, createWebHistory } from "vue-router";
import {
  HomeView,
  SearchRegistryView,
  ToolsView,
  RegistryView,
  TabularRegistryView,
} from "./routes";

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
    name: "RegistryView",
    path: "/registry",
    component: RegistryView,
  },

  {
    name: "TabularRegistryView",
    path: "/registry/table",
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
