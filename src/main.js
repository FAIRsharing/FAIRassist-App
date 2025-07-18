import { createApp } from "vue";
import { createPinia } from "pinia";
import createVuetify from "@/plugins/vuetify.js";
import Particles from "@tsparticles/vue3";
import "@fortawesome/fontawesome-free/css/all.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import { loadFull } from "tsparticles";
import Vue3Sanitize from "vue-3-sanitize";
import App from "./App/App.vue";
import router from "./router";
import { jsonToGraphQLQuery } from "json-to-graphql-query";

const pinia = createPinia();

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(createVuetify)
  .use(Particles, {
    init: async (engine) => {
      await loadFull(engine);
    },
  })
  .use(Vue3Sanitize)
  .use(jsonToGraphQLQuery);

app.mount("#app");
