import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PageFooter from "../PageFooter.vue";

describe("PageFooter", () => {
  it("renders properly", () => {
    const wrapper = mount(PageFooter);
    expect(wrapper.vm.$options.name).toMatch("PageFooter");
  });
});
