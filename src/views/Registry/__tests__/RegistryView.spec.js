import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import RegistryView from "../RegistryView.vue";

const vuetify = createVuetify();

let $route = {
  path: "/registry",
};
describe("RegistryView.vue", function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RegistryView, {
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
    expect(wrapper.vm.$options.name).toMatch("RegistryView");
  });
});
