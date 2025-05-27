import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { describe, expect, it, beforeEach } from "vitest";
import Icon from "../Icon.vue";

const vuetify = createVuetify();

describe("Icon.vue", function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Icon, {
      global: {
        plugins: [vuetify],
        stubs: ["router-link", "router-view"],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("Icon");
  });
});
