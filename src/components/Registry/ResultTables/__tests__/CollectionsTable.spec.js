import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import CollectionsTable from "../CollectionsTable.vue";
import { createPinia, setActivePinia } from "pinia";

const vuetify = createVuetify();

describe("CollectionsTable.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(CollectionsTable, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("CollectionsTable");
  });
});
