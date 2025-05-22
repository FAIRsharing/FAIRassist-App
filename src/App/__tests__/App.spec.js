import { shallowMount } from "@vue/test-utils";
import App from "../App.vue";
import { createVuetify } from "vuetify";
import { describe, expect, it } from "vitest";

const vuetify = createVuetify();
let $route = { path: "/", name: "HomeView" };

describe("App.vue", () => {
  let wrapper;

  it("can be instantiated", async () => {
    wrapper = await shallowMount(App, {
      global: {
        plugins: [vuetify],
        mocks: {
          $route: $route,
        },
        stubs: ["router-link", "router-view"],
      },
    });
    wrapper.vm.loading = false;
    expect(wrapper.vm.$options.name).toMatch("App");
  });
});
