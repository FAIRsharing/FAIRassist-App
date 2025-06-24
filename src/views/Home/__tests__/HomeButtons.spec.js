import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import HomeButtons from "../HomeButtons.vue";

const vuetify = createVuetify();

describe("HomeButtons.vue", function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HomeButtons, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("HomeButtons");
  });
});
