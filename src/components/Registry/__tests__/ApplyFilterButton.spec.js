import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it } from "vitest";
import ApplyFilterButton from "../ApplyFilterButton.vue";
import { createPinia, setActivePinia } from "pinia";

const vuetify = createVuetify();

describe("ApplyFilterButton.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(ApplyFilterButton, {
      global: {
        plugins: [vuetify],
        stubs: { VCheckbox: true },
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("ApplyFilterButton");
  });
});
