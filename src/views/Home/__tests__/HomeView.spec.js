import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import VueParticles from "@tsparticles/vue3";

import { shallowMount } from "@vue/test-utils";
import HomeView from "../HomeView.vue";

const vuetify = createVuetify();

let $route = {
  path: "/",
};
describe("HomeView.vue", function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HomeView, {
      global: {
        plugins: [vuetify],
        mocks: {
          $route: $route,
        },
        stubs: ["router-link", "router-view"],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("HomeView");
  });
});
