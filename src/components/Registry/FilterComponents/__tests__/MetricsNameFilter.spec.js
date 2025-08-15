import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import MetricsNameFilter from "../MetricsNameFilter.vue";
import { createPinia, setActivePinia } from "pinia";

const vuetify = createVuetify();

describe("MetricsNameFilter.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(MetricsNameFilter, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("MetricsNameFilter");
  });
});
