import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it } from "vitest";
import FilterMetricsBenchmarks from "../FilterMetricsBenchmarks";
import { createPinia, setActivePinia } from "pinia";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

const vuetify = createVuetify();

describe("FilterMetricsBenchmarks.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(FilterMetricsBenchmarks, {
      global: {
        plugins: [vuetify],
        stubs: { VCheckbox: true },
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("FilterMetricsBenchmarks");
  });

  it("can check when v-checkbox is selected", async () => {
    let itemList = [
      {
        id: 1,
        label: "foo",
        value: "foo",
      },
      {
        id: 2,
        label: "bar",
        value: "bar",
      },
    ];
    let selecteditem = {
      id: 2,
      label: "bar",
      value: "bar",
    };
    const component = wrapper.findComponent("[data-testid='filtersSelected']");
    await component.setValue(itemList[1]);
    expect(component.vm.modelValue).toStrictEqual(selecteditem);
  });

  it("can check when Apply Filter button is clicked", async () => {
    wrapper.vm.filtersSelected = ["metric_ids"];
    const button = wrapper.get("[data-testid='applyFilter']");
    button.trigger("click");
    const advancedSearchStore = useAdvancedSearchStore();
    expect(advancedSearchStore.fetchAdvancedSearchResults("metric_ids"))
      .toHaveBeenCalled;
  });
});
