import { beforeEach, describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";
import { shallowMount } from "@vue/test-utils";
import RegisterResource from "../RegisterResource.vue";

const vuetify = createVuetify();

describe("RegisterResource.vue", function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RegisterResource, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("RegisterResource");
  });

  it("can check button click", () => {
    const registerResourceBtn = wrapper.get(
      "[data-testid='registerResourceBtn']",
    );
    registerResourceBtn.trigger("click");
    expect(wrapper.vm.showForm).toBe(true);
  });
});
