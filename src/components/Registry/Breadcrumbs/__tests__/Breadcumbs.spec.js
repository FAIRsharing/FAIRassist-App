import {shallowMount} from "@vue/test-utils";
import {createVuetify} from "vuetify";
import {beforeEach, describe, expect, it} from "vitest";
import Breadcrumbs from "../Breadcrumbs.vue";
import {createPinia, setActivePinia} from "pinia";
import {createTestingPinia} from "@pinia/testing";
import {useAdvancedSearchStore} from "@/stores/advancedSearch.js";

const vuetify = createVuetify();

describe("Breadcrumbs.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(Breadcrumbs, {
      global: {
        plugins: [vuetify, createTestingPinia()],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("Breadcrumbs");
  });

  it("can check userSelection computed property", () => {
    let store = useAdvancedSearchStore();
    store.filterSelected = [
      { key1: ["value1", "value2"], key2: ["value3", "value4"] },
    ];
    expect(wrapper.vm.userSelection).toStrictEqual([
      "value1",
      "value2",
      "value3",
      "value4",
    ]);
  });

  it("can check formatString method", () => {
    expect(wrapper.vm.formatString("metric_ids")).toMatch("Metrics");
    expect(wrapper.vm.formatString("benchmark_ids")).toMatch("Benchmarks");
    expect(wrapper.vm.formatString("abc_edf")).toMatch("Abc edf");
  });
});
