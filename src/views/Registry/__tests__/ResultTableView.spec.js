import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import ResultTableView from "../ResultTableView.vue";
import { createPinia, setActivePinia } from "pinia";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

const vuetify = createVuetify();

describe("RegistryView.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(ResultTableView, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("ResultTableView");
  });

  it("can check noData computed property", () => {
    let store = useAdvancedSearchStore();
    store.noData = true;
    expect(wrapper.vm.noData).toBe("No data available");
  });
});
