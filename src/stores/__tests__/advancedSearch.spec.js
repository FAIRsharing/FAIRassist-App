import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import GraphClient from "@/lib/GraphClient/GraphClient.js";
import AdvancedSearchData from "./fixtures/getAdvancedSearch.json";
import sinon from "sinon";

describe("AdvancedSearch store methods", () => {
  const returnedVal = AdvancedSearchData;
  let stub, store;

  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia());
    store = useAdvancedSearchStore();
  });

  beforeAll(() => {
    stub = sinon.stub(GraphClient.prototype, "executeQuery");
    stub.returns(returnedVal);
  });

  afterAll(() => {
    stub.restore();
  });

  it("can check fetchAdvancedSearchResults actions when it has response", async () => {
    await store.fetchAdvancedSearchResults();
    expect(store.noData).toBe(false);
  });

  it("can check fetchAdvancedSearchResults actions when it has response has fairassistRelations", async () => {
    let input = {
      advancedSearch: [
        {
          id: 1,
          type: "repository",
          name: "Test Repository",
          registry: "Database",
          status: "ready",
          fairassistRelations: [
            {
              id: 11,
              type: "repository",
              name: "Child Repository",
              registry: "Database",
              status: "ready",
            },
          ],
        },
      ],
    };

    let output = [
      {
        id: 1,
        type: "repository",
        name: "Test Repository",
        registry: "Database",
        status: "ready",
      },
      {
        id: 11,
        type: "repository",
        name: "Child Repository",
        registry: "Database",
        status: "ready",
      },
    ];

    stub.returns(input);
    await store.fetchAdvancedSearchResults();
    expect(store.advancedSearchResponse).toStrictEqual(output);
  });

  it("can check fetchAdvancedSearchResults actions with empty array but no error", async () => {
    stub.returns({
      advancedSearch: [],
    });
    await store.fetchAdvancedSearchResults();
    expect(store.advancedSearchResponse).toStrictEqual([]);
    expect(store.noData).toBe(true);
  });

  it("can check fetchAdvancedSearchResults actions with Error response", async () => {
    stub.returns({
      error: "error",
    });
    await store.fetchAdvancedSearchResults();
    expect(store.advancedSearchResponse).toStrictEqual([]);
    expect(store.errorStatus).toBe(true);
  });

  it("can check getAdvancedSearchResponse getters", () => {
    let output = [
      {
        id: 2676,
        name: "BioDare2 - Biological Data Repository",
        registry: "Database",
        status: "ready",
        type: "principle",
      },
      {
        id: 6043,
        name: "FAIR Principles R1.1: (Meta)data are released with a clear and accessible data usage license",
        registry: "Standard",
        status: "ready",
        type: "principle",
      },
    ];
    store.advancedSearchResponse = output;
    expect(store.getAdvancedSearchResponse).toStrictEqual(output);
  });

  it("can check getLoadingStatus getters", () => {
    store.loadingStatus = true;
    expect(store.getLoadingStatus).toBe(true);
  });

  it("can check getErrorStatus getters", () => {
    store.errorStatus = true;
    expect(store.getErrorStatus).toBe(true);
  });

  it("can check getNoData getters", () => {
    store.noData = true;
    expect(store.getNoData).toBe(true);
  });

  it("can check getFairassistID getters", () => {
    store.fairassistID = 1;
    expect(store.getFairassistID).toBe(1);
  });

  it("can check getRecordTypeSelected getters", () => {
    store.recordTypeSelected = ["A"];
    expect(store.getRecordTypeSelected).toStrictEqual(["A"]);
  });

  it("can check getStandardsData getters", () => {
    let input = [
      {
        id: 2676,
        name: "BioDare2 - Biological Data Repository",
        registry: "Database",
        status: "ready",
        type: "principle",
      },
      {
        id: 6043,
        name: "FAIR Principles R1.1: (Meta)data are released with a clear and accessible data usage license",
        registry: "Standard",
        status: "ready",
        type: "any",
      },
    ];

    let output = [
      {
        id: 6043,
        name: "FAIR Principles R1.1: (Meta)data are released with a clear and accessible data usage license",
        registry: "Standard",
        status: "ready",
        type: "any",
      },
    ];
    store.advancedSearchResponse = input;
    expect(store.getStandardsData).toStrictEqual(output);
  });

  it("can check getDatabaseData getters", () => {
    let input = [
      {
        id: 2676,
        name: "BioDare2 - Biological Data Repository",
        registry: "Database",
        status: "ready",
        type: "principle",
      },
      {
        id: 6043,
        name: "FAIR Principles R1.1: (Meta)data are released with a clear and accessible data usage license",
        registry: "Standard",
        status: "ready",
        type: "any",
      },
    ];

    let output = [
      {
        id: 2676,
        name: "BioDare2 - Biological Data Repository",
        registry: "Database",
        status: "ready",
        type: "principle",
      },
    ];
    store.advancedSearchResponse = input;
    expect(store.getDatabaseData).toStrictEqual(output);
  });

  it("can check getPoliciesData getters", () => {
    let input = [
      {
        id: 2676,
        name: "BioDare2 - Biological Data Repository",
        registry: "Policies",
        status: "ready",
        type: "principle",
      },
      {
        id: 6043,
        name: "FAIR Principles R1.1: (Meta)data are released with a clear and accessible data usage license",
        registry: "Standard",
        status: "ready",
        type: "any",
      },
    ];

    let output = [
      {
        id: 2676,
        name: "BioDare2 - Biological Data Repository",
        registry: "Policies",
        status: "ready",
        type: "principle",
      },
    ];
    store.advancedSearchResponse = input;
    expect(store.getPoliciesData).toStrictEqual(output);
  });

  it("can check getCollectionsData getters", () => {
    let input = [
      {
        id: 2676,
        name: "BioDare2 - Biological Data Repository",
        registry: "Collection",
        status: "ready",
        type: "principle",
      },
      {
        id: 6043,
        name: "FAIR Principles R1.1: (Meta)data are released with a clear and accessible data usage license",
        registry: "Standard",
        status: "ready",
        type: "any",
      },
    ];

    let output = [
      {
        id: 2676,
        name: "BioDare2 - Biological Data Repository",
        registry: "Collection",
        status: "ready",
        type: "principle",
      },
    ];
    store.advancedSearchResponse = input;
    expect(store.getCollectionsData).toStrictEqual(output);
  });

  it("can check getMetricsData getters", () => {
    let input = [
      {
        id: 2676,
        name: "BioDare2 - Biological Data Repository",
        registry: "Collection",
        status: "ready",
        type: "metric",
      },
      {
        id: 6043,
        name: "FAIR Principles R1.1: (Meta)data are released with a clear and accessible data usage license",
        registry: "Standard",
        status: "ready",
        type: "any",
      },
    ];

    let output = [
      {
        id: 2676,
        name: "BioDare2 - Biological Data Repository",
        registry: "Collection",
        status: "ready",
        type: "metric",
      },
    ];
    store.advancedSearchResponse = input;
    expect(store.getMetricsData).toStrictEqual(output);
  });

  it("can check getPrinciplesData getters", () => {
    let input = [
      {
        id: 2676,
        name: "BioDare2 - Biological Data Repository",
        registry: "Collection",
        status: "ready",
        type: "principle",
      },
      {
        id: 6043,
        name: "FAIR Principles R1.1: (Meta)data are released with a clear and accessible data usage license",
        registry: "Standard",
        status: "ready",
        type: "any",
      },
    ];

    let output = [
      {
        id: 2676,
        name: "BioDare2 - Biological Data Repository",
        registry: "Collection",
        status: "ready",
        type: "principle",
      },
    ];
    store.advancedSearchResponse = input;
    expect(store.getPrinciplesData).toStrictEqual(output);
  });

  it("can check getBenchmarksData getters", () => {
    let input = [
      {
        id: 2676,
        name: "BioDare2 - Biological Data Repository",
        registry: "Collection",
        status: "ready",
        type: "benchmark",
      },
      {
        id: 6043,
        name: "FAIR Principles R1.1: (Meta)data are released with a clear and accessible data usage license",
        registry: "Standard",
        status: "ready",
        type: "any",
      },
    ];

    let output = [
      {
        id: 2676,
        name: "BioDare2 - Biological Data Repository",
        registry: "Collection",
        status: "ready",
        type: "benchmark",
      },
    ];
    store.advancedSearchResponse = input;
    expect(store.getBenchmarksData).toStrictEqual(output);
  });
});
