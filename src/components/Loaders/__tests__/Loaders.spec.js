import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it } from "vitest";
import Loaders from "../Loaders";

const vuetify = createVuetify();

describe("Loaders.vue", function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Loaders, {
      global: {
        plugins: [vuetify],
        stubs: ["router-link", "router-view"],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("Loaders");
  });
});
