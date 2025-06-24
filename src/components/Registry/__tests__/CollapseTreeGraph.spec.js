import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it } from "vitest";
import CollapseTreeGraph from "../CollapseTreeGraph";
import axios from "axios";
import sinon from "sinon";
import d3GraphData from "./data/d3GraphData.json";

const vuetify = createVuetify();

describe("CollapseTreeGraph.vue", function () {
  let wrapper;
  let getStub = sinon.stub(axios, "get");
  getStub.withArgs(sinon.match.any).returns(d3GraphData);

  beforeEach(() => {
    wrapper = shallowMount(CollapseTreeGraph, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("CollapseTreeGraph");
  });

  it("can check if getGraphData method have the error in catch block", async () => {
    getStub.withArgs(sinon.match.any).returns({
      status: 404,
    });
    await wrapper.vm.getGraphData();
    expect(wrapper.vm.noData).toBe(true);
  });
});
