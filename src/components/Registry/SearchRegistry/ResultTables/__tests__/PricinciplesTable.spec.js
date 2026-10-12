import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import PrinciplesTable from "../PrinciplesTable.vue";
import { createPinia, setActivePinia } from "pinia";

const vuetify = createVuetify();

describe("PrinciplesTable.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(PrinciplesTable, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("PrinciplesTable");
  });
});
