import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";
import { shallowMount } from "@vue/test-utils";
import ResourceTable from "../ResourceTable.vue";
import axios from "axios";
import sinon from "sinon";
import resourceTableData from "./data/resourceTableData";

const vuetify = createVuetify();

describe("ResourceTable.vue", function () {
  let wrapper;
  let getStub = sinon.stub(axios, "get");
  getStub.withArgs(sinon.match.any).returns(resourceTableData);

  beforeEach(() => {
    wrapper = shallowMount(ResourceTable, {
      global: {
        plugins: [vuetify],
      },
    });
  });

  afterAll(() => {
    getStub.restore();
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("ResourceTable");
  });

  it("can check if getResourceData method have the error in catch block", async () => {
    getStub.withArgs(sinon.match.any).returns({
      status: 404,
    });
    await wrapper.vm.getResourceData();
    expect(wrapper.vm.noData).toEqual("No data found.");
  });
});
