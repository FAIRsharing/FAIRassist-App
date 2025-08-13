import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import PageHeader from "../PageHeader/PageHeader.vue";

describe("PageHeader", () => {
  it("renders properly", () => {
    const wrapper = shallowMount(PageHeader);
    expect(wrapper.vm.$options.name).toMatch("PageHeader");
  });
});
