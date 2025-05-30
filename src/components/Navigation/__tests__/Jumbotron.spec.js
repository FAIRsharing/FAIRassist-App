import { shallowMount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { beforeEach, describe, expect, it } from "vitest";
import Jumbotron from "../PageHeader/Jumbotron.vue";
import VueParticles from "@tsparticles/vue3";

const vuetify = createVuetify();
let $route = {
  path: "/",
  name: "HomeView",
};

describe("Jumbotron", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Jumbotron, {
      global: {
        components: {
          "vue-particles": VueParticles,
        },
        plugins: [vuetify],
        mocks: {
          $route: $route,
        },
        stubs: ["router-link", "router-view"],
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("Jumbotron");
  });

  it("can check if getJumbotronData has tempSubTitle text", () => {
    const tempSubTitle = wrapper.get("[data-testid='tempSubTitle']");
    expect(tempSubTitle.text()).toEqual("Beta");
  });

  it("can check getJumbotronData does not has tempSubTitle text (ELSE condition)", () => {
    wrapper.vm.getJumbotronData["tempSubTitle"] = "";
    expect(wrapper.find("#tempSubTitle").exists()).toBe(false);
  });

  it("can check if getJumbotronData has subTitle text when fullPath has a value", () => {
    $route = {
      fullPath: "/",
    };
    const subTitle = wrapper.get("[data-testid='subTitle']");
    expect(subTitle.text()).toEqual(
      "FAIRassist provides FAIR-enabling services and guidance for data stewards and software developers",
    );
  });

  it("can check getJumbotronData does not has subTitle text (ELSE condition)", () => {
    wrapper.vm.getJumbotronData["subTitle"] = "";
    expect(wrapper.find("#subTitle").exists()).toBe(false);
  });
});
