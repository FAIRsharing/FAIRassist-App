import { beforeEach, describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import Menu from "../PageHeader/Menu.vue";
import { createVuetify } from "vuetify/framework";

const vuetify = createVuetify();
describe("Menu", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Menu, {
      global: {
        plugins: [vuetify],
        stubs: { VIcon: true, VMenu: true },
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("Menu");
  });

  it("can check when is overlay is true", () => {
    const overlay = wrapper.get("[data-testid='showOverlay']");
    overlay.trigger("click");
    expect(wrapper.vm.overlay).toBe(true);
  });

  // it("can check when is overlay is false", () => {
  //   wrapper.vm.overlay = true;
  //   const overlay = wrapper.get("[data-testid='hideOverlay']");
  //   overlay.trigger("click");
  //   expect(wrapper.vm.overlay).toBe(false);
  // });
});
