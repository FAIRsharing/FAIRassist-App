import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";

import { mount } from "@vue/test-utils";
import TableComponent from "../TableComponent.vue";
import { createPinia, setActivePinia } from "pinia";

const vuetify = createVuetify();

describe("TableComponent.vue", function () {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(TableComponent, {
      global: {
        plugins: [vuetify],
        data() {
          return {
            fairsharingURL: import.meta.env.VITE_FAIRSHARING_URL,
            headers: [
              {
                title: "Name",
                value: "name",
                align: "center",
                key: "name",
                sortable: false,
              },
              {
                title: "Type",
                value: "type",
                align: "center",
                key: "type",
                sortable: false,
              },
              {
                title: "Status",
                value: "status",
                align: "center",
                key: "status",
                sortable: false,
              },
            ],
            loading: false,
          };
        },
        props: {
          itemList: ["foo"],
          hideType: false,
        },
        stubs: { vDataTable: true },
      },
    });
  });

  it("can be instantiated", () => {
    expect(wrapper.vm.$options.name).toMatch("TableComponent");
  });

  it("can check headersList computed property", async () => {
    await wrapper.setProps({ hideType: true });
    let output = [
      {
        title: "Name",
        value: "name",
        align: "center",
        key: "name",
        sortable: false,
      },
      {
        title: "Status",
        value: "status",
        align: "center",
        key: "status",
        sortable: false,
      },
    ];
    expect(wrapper.vm.headersList).toStrictEqual(output);
  });
});
