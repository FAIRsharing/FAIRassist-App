import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it } from "vitest";
import FilterMetricsBenchmarks from "../FilterMetricsBenchmarks";
import { createPinia, setActivePinia } from "pinia";

const vuetify = createVuetify();

describe("FilterMetricsBenchmarks.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(FilterMetricsBenchmarks, {
      global: {
        plugins: [vuetify],
        stubs: { VCheckbox: true },
        data: () => {
          return {
            filtersSelected: [],
            filters: [
              {
                id: 1,
                label: "test",
              },
            ],
          };
        },
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("FilterMetricsBenchmarks");
  });
});
