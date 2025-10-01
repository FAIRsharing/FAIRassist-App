import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import OrganisationsFilter from "../OrganisationsFilter.vue";
import { createTestingPinia } from "@pinia/testing";
import sinon from "sinon";
import axios from "axios";

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
});
