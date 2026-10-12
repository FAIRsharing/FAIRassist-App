import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import PoliciesTable from "../PoliciesTable.vue";
import { createPinia, setActivePinia } from "pinia";

const vuetify = createVuetify();

describe("PoliciesTable.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(PoliciesTable, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("PoliciesTable");
  });
});
