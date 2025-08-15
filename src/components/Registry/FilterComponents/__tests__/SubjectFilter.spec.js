import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import SubjectFilter from "../SubjectFilter.vue";
import { useSubjectSearchStore } from "@/stores/subjectSearch.js";
import {createTestingPinia} from "@pinia/testing";

const vuetify = createVuetify();

describe("SubjectFilter.vue", function () {
  let wrapper, store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useSubjectSearchStore();
    store.getters = {
      getSearchSubjects: () => {
        return ["Test", "Abc"];
      },
    };
    let actions = {
      fetchSearchSubjects: vi.fn(),
    };
    wrapper = shallowMount(SubjectFilter, {
      global: {
        plugins: [vuetify, createTestingPinia()],
        actions,
        store: store,
      },
    });
  });

  it("can be instantiated", () => {
    wrapper.vm.$options.watch.itemSelected.call(wrapper.vm, ["A", "B"]);
    expect(wrapper.vm.$options.name).toMatch("SubjectFilter");
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
