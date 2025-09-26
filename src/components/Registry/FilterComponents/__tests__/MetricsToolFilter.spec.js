import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import MetricsToolFilter from "../MetricsToolFilter.vue";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import axios from "axios";
import sinon from "sinon";
import { createTestingPinia } from "@pinia/testing";

const vuetify = createVuetify();

let response = {
  config: {
    adapter: "['xhr', 'http', 'fetch']",
  },
  data: ["FAIR Evaluation Services", "FAIR Champion"],
};

describe("MetricsToolFilter.vue", function () {
  let getStub = sinon.stub(axios, "get");
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(MetricsToolFilter, {
      global: {
        plugins: [vuetify, createTestingPinia()],
      },
    });
  });
  afterAll(() => {
    getStub.restore();
  });

  it("can be instantiated", () => {
    wrapper.vm.$options.watch.itemSelected.call(wrapper.vm, ["A", "B"]);
    expect(wrapper.vm.$options.name).toMatch("MetricsToolFilter");
  });

  it("can check disabled computed property", () => {
    const advancedSearchStore = useAdvancedSearchStore();
    advancedSearchStore.recordTypeSelected = ["benchmark_ids"];
    expect(wrapper.vm.disabled).toBe(true);
  });

  it("can check selectedValue method", () => {
    wrapper.vm.selectedValue(["A", "B"]);
    expect(wrapper.vm.itemSelected).toStrictEqual(["A", "B"]);
  });

  it("can check getTools method", async () => {
    getStub.returns(response);
    let output = ["FAIR Evaluation Services", "FAIR Champion"];
    await wrapper.vm.getTools();
    expect(wrapper.vm.toolsList).toStrictEqual(output);
  });

  it("can check getTools method have the error in catch block", async () => {
    getStub.returns({
      error: true,
      status: 404,
    });
    wrapper.vm.noData = true;
    await wrapper.vm.getTools();
    expect(wrapper.vm.noData).toBe(true);
  });
});
