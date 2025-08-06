import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import MetricsToolFilter from "../MetricsToolFilter.vue";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

const vuetify = createVuetify();

describe("MetricsToolFilter.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(MetricsToolFilter, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  it("can be instantiated", () => {
    wrapper.vm.$options.watch.itemSelected.call(wrapper.vm, ["A", "B"]);
    expect(wrapper.vm.$options.name).toMatch("MetricsToolFilter");
  });

  it("can check disabled computed property", () => {
    const advancedSearchStore = useAdvancedSearchStore();
    advancedSearchStore.recordTypeSelected = ["benchmark_ids"];
    expect(wrapper.vm.disabled).toBe(true);
  });

  it("can check selectedValue method", () => {
    wrapper.vm.selectedValue(["A", "B"]);
    expect(wrapper.vm.itemSelected).toStrictEqual(["A", "B"]);
  });
});
