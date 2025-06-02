import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import RegistryView from "../RegistryView.vue";

const vuetify = createVuetify();

describe("RegistryView.vue", function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RegistryView, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("RegistryView");
  });
});
