import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { shallowMount } from "@vue/test-utils";
import ToolsView from "../ToolsView.vue";

const vuetify = createVuetify();

describe("ToolsView.vue", function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ToolsView, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("ToolsView");
  });
});
