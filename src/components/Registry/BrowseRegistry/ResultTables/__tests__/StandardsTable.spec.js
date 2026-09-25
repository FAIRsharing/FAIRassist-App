import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import StandardsTable from "../StandardsTable.vue";
import { createPinia, setActivePinia } from "pinia";

const vuetify = createVuetify();

describe("StandardsTable.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(StandardsTable, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("StandardsTable");
  });
});
