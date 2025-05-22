import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { describe, it, expect, beforeEach } from "vitest";
import Jumbotron from "../Jumbotron.vue";
import VueParticles from "@tsparticles/vue3";

const vuetify = createVuetify();
let $route = { path: "/", name: "HomeView" };

describe("Jumbotron", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Jumbotron, {
      global: {
        components: {
          "vue-particles": VueParticles,
        },
        plugins: [vuetify],
        mocks: {
          $route: $route,
        },
        stubs: ["router-link", "router-view"],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("Jumbotron");
  });
});
