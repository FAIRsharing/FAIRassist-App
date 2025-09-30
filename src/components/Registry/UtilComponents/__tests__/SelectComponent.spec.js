import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { mount } from "@vue/test-utils";
import SelectComponent from "../SelectComponent.vue";
import { createPinia, setActivePinia } from "pinia";

const vuetify = createVuetify();

describe("SelectComponent.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(SelectComponent, {
      global: {
        plugins: [vuetify],
        data: () => {
          return {
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
        stubs: { vCombobox: true },
      },
    });
  });

  it("can be instantiated", () => {
    wrapper.vm.$options.watch.disabled.call(wrapper.vm, true);
    wrapper.vm.$options.watch.model.call(wrapper.vm, ["xyz"]);
    expect(wrapper.vm.$options.name).toMatch("SelectComponent");
  });

  it("can check v-model", async () => {
    let itemListArr = ["foo"];
    const component = wrapper.findComponent(
      "[data-testid='comboboxComponent']",
    );
    component.componentVM.search = "abc";
    await component.setValue(itemListArr);
    expect(wrapper.vm.model).toStrictEqual(itemListArr);
  });

  it("can check cleanTextList computed property keyword when format props is false", async () => {
    await wrapper.setProps({ itemList: ["abc", "xyz"] });
    expect(wrapper.vm.cleanTextList).toStrictEqual(["Abc", "Xyz"]);
  });

  it("can check cleanTextList computed property keyword when format props is true", async () => {
    await wrapper.setProps({ format: true });
    await wrapper.setProps({ itemList: ["FAIR", "FOOPS!"] });
    expect(wrapper.vm.cleanTextList).toStrictEqual(["FAIR", "FOOPS!"]);
  });
});
