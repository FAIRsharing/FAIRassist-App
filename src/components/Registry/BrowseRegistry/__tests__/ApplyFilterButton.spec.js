import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ApplyFilterButton from "../ApplyFilterButton.vue";
import { createPinia, setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

const vuetify = createVuetify();

const $router = { push: vi.fn() };

describe("ApplyFilterButton.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(ApplyFilterButton, {
      global: {
        mocks: { $router },
        plugins: [vuetify, createTestingPinia()],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("ApplyFilterButton");
  });

  it("check fetchAdvancedSearchResults called on click of 'Apply Filter' button", async () => {
    const store = useAdvancedSearchStore();
    const applyFilterButton = wrapper.get("[data-testid='applyFilter']");
    applyFilterButton.trigger("click");
    expect(store.fetchAdvancedSearchResults()).toHaveBeenCalled;
  });
});
