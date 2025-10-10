import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import ResultTableView from "../ResultTableView.vue";
import { createPinia, setActivePinia } from "pinia";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import { fetchQueryParams } from "@/utils/queryUtil.js";

const vuetify = createVuetify();
let route = {
  query: {
    search: "(principle=The FAIR Principles&recordType=benchmark_ids)",
  },
};

describe("RegistryView.vue", function () {
  vi.mock("@/utils/queryUtil.js", () => ({
    fetchQueryParams: vi.fn(),
  }));
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(ResultTableView, {
      global: {
        plugins: [vuetify],
        mocks: {
          $route: route,
        },
      },
    });
  });

  it("can be instantiated", async () => {
    expect(wrapper.vm.$options.name).toMatch("ResultTableView");
  });

  it("can check noData computed property", () => {
    let store = useAdvancedSearchStore();
    store.noData = true;
    expect(wrapper.vm.noData).toBe("No data available");
  });
});
