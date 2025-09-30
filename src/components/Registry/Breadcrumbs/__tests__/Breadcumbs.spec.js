import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it } from "vitest";
import Breadcrumbs from "../Breadcrumbs.vue";
import { createPinia, setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

const vuetify = createVuetify();

describe("Breadcrumbs.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(Breadcrumbs, {
      global: {
        plugins: [vuetify, createTestingPinia()],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("Breadcrumbs");
  });

  it("can check recordType method", () => {
    expect(wrapper.vm.recordType("metric_ids")).toMatch("Metrics");
    expect(wrapper.vm.recordType("benchmark_ids")).toMatch("Benchmarks");
  });
});
