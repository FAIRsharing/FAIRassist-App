import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import MetricsNameFilter from "../MetricsNameFilter.vue";

const vuetify = createVuetify();

describe("MetricsNameFilter.vue", function () {
  let wrapper;

  beforeEach(() => {
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
