import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import BenchmarksTable from "../BenchmarksTable.vue";
import { createPinia, setActivePinia } from "pinia";

const vuetify = createVuetify();

describe("BenchmarksTable.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(BenchmarksTable, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("BenchmarksTable");
  });
});
