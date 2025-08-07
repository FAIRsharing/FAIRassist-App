import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import OrganisationsFilter from "../OrganisationsFilter.vue";
import { useOrganisationSearchStore } from "@/stores/organisationSearch.js";

const vuetify = createVuetify();

describe("OrganisationsFilter.vue", function () {
  let wrapper, store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useOrganisationSearchStore();
    store.getters = {
      getSearchOrganisations: () => {
        return ["Test", "Abc"];
      },
    };
    let actions = {
      fetchSearchOrganisations: vi.fn(),
    };
    wrapper = shallowMount(OrganisationsFilter, {
      global: {
        plugins: [vuetify],
        actions,
        store: store,
      },
    });
  });

  it("can be instantiated", () => {
    wrapper.vm.$options.watch.itemSelected.call(wrapper.vm, ["A", "B"]);
    expect(wrapper.vm.$options.name).toMatch("OrganisationsFilter");
  });

  it("can check selectedValue method", () => {
    wrapper.vm.selectedValue(["A", "B"]);
    expect(wrapper.vm.itemSelected).toStrictEqual(["A", "B"]);
  });

  it("can check getResults method", async () => {
    const spyOnLogin = vi.spyOn(wrapper.vm, "getResults");
    wrapper.vm.getResults("abc");
    expect(spyOnLogin).toHaveBeenCalled();
  });
});
