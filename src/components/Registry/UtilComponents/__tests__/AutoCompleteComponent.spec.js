import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { mount } from "@vue/test-utils";
import AutoCompleteComponent from "../AutoCompleteComponent.vue";
import { createPinia, setActivePinia } from "pinia";

const vuetify = createVuetify();

describe("AutoCompleteComponent.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(AutoCompleteComponent, {
      global: {
        plugins: [vuetify],
        data: () => {
          return {
            search: null,
            model: ["foo"],
          };
        },
        props: {
          itemList: ["foo"],
          itemValue: ["foo"],
          loading: false,
          toolTipText: "dummy",
          label: "label",
          disabled: false,
        },
        stubs: { vAutocomplete: true },
      },
    });
  });

  it("can be instantiated", () => {
    //When search text is more than 3 words
    wrapper.vm.$options.watch.search.call(wrapper.vm, "test");
    //When search text is less than 3 words
    wrapper.vm.$options.watch.search.call(wrapper.vm, "te");
    wrapper.vm.$options.watch.model.call(wrapper.vm, ["xyz"]);
    expect(wrapper.vm.$options.name).toMatch("AutoCompleteComponent");
  });
  it("can check v-model", async () => {
    let itemListArr = ["foo"];
    const component = wrapper.findComponent(
      "[data-testid='autocompleteComponent']",
    );
    component.componentVM.search = "abc";
    await component.setValue(itemListArr);
    expect(wrapper.vm.model).toStrictEqual(itemListArr);
  });
});
