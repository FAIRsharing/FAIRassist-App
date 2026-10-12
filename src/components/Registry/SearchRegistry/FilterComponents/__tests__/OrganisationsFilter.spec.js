import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import OrganisationsFilter from "../OrganisationsFilter.vue";
import { createTestingPinia } from "@pinia/testing";
import sinon from "sinon";
import axios from "axios";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

const vuetify = createVuetify();

let response = {
  config: {
    adapter: "['xhr', 'http', 'fetch']",
  },
  data: ["a", "B", "c"],
};

describe("OrganisationsFilter.vue", function () {
  let getStub = sinon.stub(axios, "get");
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(OrganisationsFilter, {
      global: {
        plugins: [vuetify, createTestingPinia()],
      },
    });
  });

  it("can be instantiated", () => {
    const component = wrapper.findComponent("[data-testid='selectComponent']");
    component.setValue(["A"]);
    wrapper.vm.$options.watch.itemSelected.call(wrapper.vm, ["A", "B"]);
    expect(wrapper.vm.$options.name).toMatch("OrganisationsFilter");
  });

  it("can check selectedValue method", () => {
    wrapper.vm.selectedValue(["C", "D"]);
    expect(wrapper.vm.itemSelected).toStrictEqual(["C", "D"]);
  });

  it("can check getOrganisations method", async () => {
    getStub.returns(response);
    let output = ["a", "B", "c"];
    await wrapper.vm.getOrganisations();
    expect(wrapper.vm.organisationsList).toStrictEqual(output);
  });

  it("can check fetchOnLoad method on mount", () => {
    wrapper.vm.fetchOnLoad();
    const store = useAdvancedSearchStore();
    store.organisationSelected = {
      organisations: ["test"],
    };
    wrapper.vm.itemValue = ["test"];
    expect(wrapper.vm.itemValue).toStrictEqual(["test"]);
  });
});
