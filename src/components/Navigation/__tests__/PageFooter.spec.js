import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import PageFooter from "../PageFooter.vue";

describe("PageFooter", () => {
  it("renders properly", () => {
    const wrapper = shallowMount(PageFooter);
    expect(wrapper.vm.$options.name).toMatch("PageFooter");
  });
});
