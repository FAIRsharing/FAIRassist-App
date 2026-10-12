import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import SearchRegistryView from "@/views/Registry/SearchRegistry/SearchRegistryView.vue";
import { createPinia, setActivePinia } from "pinia";

const vuetify = createVuetify();

let $route = {
  path: "/registry/search",
};
describe("SearchRegistryView.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(SearchRegistryView, {
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
    expect(wrapper.vm.$options.name).toMatch("SearchRegistryView");
  });
});
