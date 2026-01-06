import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CollapseTreeGraph from "../CollapseTreeGraph";
import axios from "axios";
import sinon from "sinon";
import d3GraphData from "./data/d3GraphData.json";
import { createPinia, setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

const vuetify = createVuetify();
const $router = { replace: vi.fn() };

if (!globalThis.visualViewport) {
  vi.stubGlobal("visualViewport", new EventTarget());
}

describe("CollapseTreeGraph.vue", function () {
  vi.mock("d3", () => ({}));
  let wrapper;
  let getStub = sinon.stub(axios, "get");
  getStub.returns(d3GraphData);

  beforeEach(() => {
    setActivePinia(createPinia());

    wrapper = mount(CollapseTreeGraph, {
      global: {
        plugins: [vuetify, createTestingPinia()],
        stubs: { vSelect: true },
        mocks: { $router },
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("CollapseTreeGraph");
  });

  it("getGraphData() method is called on v-select when mounted", async () => {
    let itemList = [
      {
        id: 1,
        name: "foo",
      },
      {
        id: 2,
        name: "bar",
      },
    ];
    await wrapper.vm.getGraphData();
    const component = wrapper.findComponent("[data-testid='selectGraph']");
    await component.setValue(itemList[1]);
    expect(component.vm.modelValue).toBe("bar");
  });

  it("can check if getGraphData() method have the error in catch block", async () => {
    getStub.returns(new Error("error"));
    await wrapper.vm.getGraphData();
    expect(wrapper.vm.noData).toBe(true);
  });

  it("can check resetPopup() method", () => {
    let store = useAdvancedSearchStore();
    store.advancedSearchResponse = ["test", "test1", "test2"];
    store.noData = true;
    wrapper.vm.resetPopup();
    expect(wrapper.vm.showDialog).toBe(true);
  });

  it("can check if yesResetSelection() method ", () => {
    wrapper.vm.yesResetSelection(true);
    expect(wrapper.vm.getGraphData).toHaveBeenCalled;
    expect(wrapper.vm.showDialog).toBe(false);
  });

  it("can check if noResetSelection() method ", () => {
    wrapper.vm.currentId = 1;
    wrapper.vm.noResetSelection(true);
    expect(wrapper.vm.fairassistID).toBe(1);
    expect(wrapper.vm.showDialog).toBe(false);
  });
});
