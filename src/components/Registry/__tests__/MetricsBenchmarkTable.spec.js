import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it } from "vitest";
import MetricsBenchmarkTable from "../MetricsBenchmarkTable";
import { createPinia, setActivePinia } from "pinia";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

const vuetify = createVuetify();

describe("MetricsBenchmarkTable.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(MetricsBenchmarkTable, {
      global: {
        plugins: [vuetify],
        data: () => {
          return {
            noData: false,
            fairassistID: 1236,
            itemList: [
              {
                id: 1236,
                name: "The FAIR Principles",
              },
              {
                id: 4100,
                name: "FAIR Principles for Research Software",
              },
            ],
          };
        },
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("MetricsBenchmarkTable");
  });

  it("can check noData computed property", () => {
    const advancedSearchStore = useAdvancedSearchStore();
    advancedSearchStore.noData = true;
    expect(wrapper.vm.noData).toBe("No data available");
  });
});
