import { createApp } from 'vue'
import { createPinia } from 'pinia'

import createVuetify from "@/plugins/vuetify.js";
import Particles from "@tsparticles/vue3";
import "@fortawesome/fontawesome-free/css/all.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import { loadFull } from "tsparticles";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createVuetify)
app.use(Particles, {
    init: async (engine) => {
      await loadFull(engine);
    },
  })

app.mount('#app')
