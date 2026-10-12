import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import RegistryButtons from "../RegistryButtons.vue";

const vuetify = createVuetify();

describe("RegistryButtons.vue", function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RegistryButtons, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("RegistryButtons");
  });
});
