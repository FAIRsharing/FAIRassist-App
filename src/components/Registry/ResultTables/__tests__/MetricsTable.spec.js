import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import MetricsTable from "../MetricsTable.vue";
import { createPinia, setActivePinia } from "pinia";

const vuetify = createVuetify();

describe("MetricsTable.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(MetricsTable, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("MetricsTable");
  });
});
