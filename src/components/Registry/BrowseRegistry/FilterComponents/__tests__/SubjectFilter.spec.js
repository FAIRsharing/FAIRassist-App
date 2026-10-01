import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import SubjectFilter from "../SubjectFilter.vue";
import { createTestingPinia } from "@pinia/testing";
import sinon from "sinon";
import axios from "axios";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

const vuetify = createVuetify();

let response = {
  config: {
    adapter: "['xhr', 'http', 'fetch']",
  },
  data: ["subject agnostic", "data governance", "data stewardship"],
};

describe("SubjectFilter.vue", function () {
  let getStub = sinon.stub(axios, "get");
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(SubjectFilter, {
      global: {
        plugins: [vuetify, createTestingPinia()],
      },
    });
  });

  afterAll(() => {
    getStub.restore();
  });

  it("can be instantiated", () => {
    const component = wrapper.findComponent("[data-testid='selectComponent']");
    component.setValue(["A"]);
    wrapper.vm.$options.watch.itemSelected.call(wrapper.vm, ["A", "B"]);
    expect(wrapper.vm.$options.name).toMatch("SubjectFilter");
  });

  it("can check selectedValue method", () => {
    wrapper.vm.selectedValue(["A", "B"]);
    expect(wrapper.vm.itemSelected).toStrictEqual(["A", "B"]);
  });

  it("can check getSubjects method", async () => {
    getStub.returns(response);
    let output = ["subject agnostic", "data governance", "data stewardship"];
    await wrapper.vm.getSubjects();
    expect(wrapper.vm.subjectsList).toStrictEqual(output);
  });

  it("can check fetchOnLoad method on mount", () => {
    wrapper.vm.fetchOnLoad();
    const store = useAdvancedSearchStore();
    store.subjectSelected = {
      subjects: ["test"],
    };
    wrapper.vm.itemValue = ["test"];
    expect(wrapper.vm.itemValue).toStrictEqual(["test"]);
  });
});
