import { fetchQueryParams, generateSelectionQuery } from "@/utils/queryUtil.js";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import { beforeEach } from "vitest";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

describe("queryUtil.js", function () {
  let store;
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createTestingPinia());
    store = useAdvancedSearchStore();
  });

  it("can check generateSelectionQuery method", () => {
    let principle = "The FAIR Principles";
    let selection = [
      { objectTypes: [] },
      { toolNames: [] },
      { recordType: ["benchmark_ids"] },
    ];
    let output = "(principle=The FAIR Principles&recordType=benchmark_ids)";
    expect(generateSelectionQuery(principle, selection)).toBe(output);
  });

  it("can check fetchQueryParams method when principle is 'The FAIR Principles' and recordtype is 'benchmark_ids'", async () => {
    let route = {
      query: {
        search: "(principle=The FAIR Principles&recordType=benchmark_ids)",
      },
    };

    await fetchQueryParams(route);
    expect(store.fairassistID).toBe(1236);
    expect(store.recordTypeSelected).toStrictEqual(["benchmark_ids"]);
  });

  it("can check fetchQueryParams method when principle is 'FAIR Principles for Research Software'", async () => {
    let route = {
      query: {
        search:
          "(principle=FAIR Principles for Research Software&recordType=benchmark_ids)",
      },
    };

    await fetchQueryParams(route);
    expect(store.fairassistID).toBe(4100);
  });

  it("can check fetchQueryParams method when has objectTypes in query param", async () => {
    let route = {
      query: {
        search:
          "(principle=The FAIR Principles&objectTypes=data_management_plan&recordType=metric_ids)",
      },
    };

    await fetchQueryParams(route);
    let output = {
      objectType: ["data management plan"],
    };
    expect(store.objectTypeSelected).toStrictEqual(output);
  });

  it("can check fetchQueryParams method when has subjects in query param", async () => {
    let route = {
      query: {
        search:
          "(principle=The FAIR Principles&subjects=subject_agnostic&recordType=metric_ids)",
      },
    };

    await fetchQueryParams(route);
    let output = {
      subjects: ["subject agnostic"],
    };
    expect(store.subjectSelected).toStrictEqual(output);
  });

  it("can check fetchQueryParams method when has organisations in query param", async () => {
    let route = {
      query: {
        search:
          "(principle=The FAIR Principles&organisations=oxford_university&recordType=metric_ids)",
      },
    };

    await fetchQueryParams(route);
    let output = {
      organisations: ["oxford university"],
    };
    expect(store.organisationSelected).toStrictEqual(output);
  });

  it("can check fetchQueryParams method when has toolNames in query param", async () => {
    let route = {
      query: {
        search:
          "(principle=The FAIR Principles&toolNames=FAIR_tool&recordType=metric_ids)",
      },
    };

    await fetchQueryParams(route);
    let output = {
      toolNames: ["FAIR tool"],
    };
    expect(store.toolsSelected).toStrictEqual(output);
  });
});
