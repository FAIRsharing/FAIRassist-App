import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it } from "vitest";
import SelectRecordType from "../SelectRecordType.vue";
import { createPinia, setActivePinia } from "pinia";

const vuetify = createVuetify();

describe("SelectRecordType.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());

    wrapper = shallowMount(SelectRecordType, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  it("can be instantiated", () => {
    wrapper.vm.$options.watch.itemSelected.call(wrapper.vm, ["A", "B"]);
    expect(wrapper.vm.$options.name).toMatch("SelectRecordType");
  });

  it("can check selectedValue method", () => {
    wrapper.vm.selectedValue(["Metrics", "Benchmarks"]);
    expect(wrapper.vm.itemSelected).toStrictEqual([
      "metric_ids",
      "benchmark_ids",
    ]);
  });
});
