import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import ObjectTypeFilter from "../ObjectTypeFilter.vue";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import { createTestingPinia } from "@pinia/testing";

const vuetify = createVuetify();

describe("MetricsToolFilter.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(ObjectTypeFilter, {
      global: {
        plugins: [vuetify, createTestingPinia()],
      },
    });
  });

  it("can be instantiated", () => {
    const component = wrapper.findComponent("[data-testid='selectComponent']");
    component.setValue(["A"]);
    wrapper.vm.$options.watch.itemSelected.call(wrapper.vm, ["A", "B"]);
    expect(wrapper.vm.$options.name).toMatch("ObjectTypeFilter");
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

  it("can check fetchOnLoad method on mount", () => {
    wrapper.vm.fetchOnLoad();
    const store = useAdvancedSearchStore();
    store.objectTypeSelected = {
      objectType: ["test"],
    };
    wrapper.vm.itemValue = ["test"];
    expect(wrapper.vm.itemValue).toStrictEqual(["test"]);
  });
});
