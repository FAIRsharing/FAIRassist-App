import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CollapseTreeGraph from "../CollapseTreeGraph";
import axios from "axios";
import sinon from "sinon";
import d3GraphData from "./data/d3GraphData.json";
import { createPinia, setActivePinia } from "pinia";

const vuetify = createVuetify();

describe("CollapseTreeGraph.vue", function () {
  vi.mock("d3", () => ({}));
  let wrapper;
  let getStub = sinon.stub(axios, "get");
  getStub.returns(d3GraphData);

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(CollapseTreeGraph, {
      global: {
        plugins: [vuetify],
        stubs: { vSelect: true },
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("CollapseTreeGraph");
  });

  it("getGraphData method is called on v-select when mounted", async () => {
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
    const component = wrapper.findComponent("[data-testid='selectGraph']");
    await component.setValue(itemList[1]);
    expect(component.vm.modelValue).toBe("bar");
  });

  it("can check if getGraphData method have the error in catch block", async () => {
    getStub.returns(new Error("error"));
    await wrapper.vm.getGraphData();
    expect(wrapper.vm.noData).toBe(true);
  });
});
