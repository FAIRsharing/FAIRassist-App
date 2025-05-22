import { createApp } from "vue";
import store from "./store";
import createVuetify from "@/plugins/vuetify.js";
import Particles from "@tsparticles/vue3";
import "@fortawesome/fontawesome-free/css/all.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "core-js/stable";
import { loadFull } from "tsparticles";
import Vue3Sanitize from "vue-3-sanitize";
import App from "./App.vue";
import router from "./router";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(createVuetify)
  .use(Particles, {
    init: async (engine) => {
      await loadFull(engine);
    },
  })
  .use(Vue3Sanitize);

app.mount("#app");
