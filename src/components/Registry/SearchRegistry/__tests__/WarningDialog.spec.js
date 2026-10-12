import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import WarningDialog from "../WarningDialog.vue";

import { createPinia, setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

const vuetify = createVuetify();
const $router = { replace: vi.fn() };

describe("WarningDialog.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());

    wrapper = mount(WarningDialog, {
      global: {
        plugins: [vuetify, createTestingPinia()],
        mocks: { $router },
        stubs: {
          VDialog: {
            name: "VDialog",
            template: '<div class="v-dialog-stub"><slot /></div>',
            props: ["modelValue"],
          },
        },
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("WarningDialog");
  });

  it("can check resetSelection() method", () => {
    wrapper.vm.showPopup = true;
    const overlay = wrapper.get("[data-testid='resetSelection']");
    overlay.trigger("click");
    wrapper.vm.resetSelection();
    wrapper.vm.$vuetify.display.smAndDown = true;
    expect(wrapper.vm.showPopup).toBe(false);
  });

  it("can check noResetSelection() method", () => {
    wrapper.vm.showPopup = true;
    const overlay = wrapper.get("[data-testid='noResetSelection']");
    overlay.trigger("click");
    wrapper.vm.noResetSelection();
    expect(wrapper.vm.showPopup).toBe(false);
  });
});
