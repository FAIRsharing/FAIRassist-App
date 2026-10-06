import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import TabularRegistryView from "@/views/Registry/TabularRegistry/TabularRegistryView.vue";
import { createPinia, setActivePinia } from "pinia";

const vuetify = createVuetify();

let $route = {
  path: "/registry/table",
};
describe("TabularRegistryView.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(TabularRegistryView, {
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
    expect(wrapper.vm.$options.name).toMatch("TabularRegistryView");
  });
});
