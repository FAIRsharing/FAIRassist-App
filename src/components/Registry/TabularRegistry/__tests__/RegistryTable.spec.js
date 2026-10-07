import { flushPromises, shallowMount } from "@vue/test-utils";
import axios from "axios";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import RegistryTable from "@/components/Registry/TabularRegistry/RegistryTable.vue";
import {
  convertPrinciplesToTable,
  filterTableByBenchmark,
  getBenchmarkOptions,
} from "@/utils/fairassistUtils";

vi.mock("axios");

vi.mock("@/utils/fairassistUtils", () => ({
  convertPrinciplesToTable: vi.fn(),
  filterTableByBenchmark: vi.fn(),
  getBenchmarkOptions: vi.fn(),
}));

const apiResponse = {
  fairsharing_record_id: 1236,
  name: "The FAIR Principles",
  abbreviation: "FAIR",
  type: "principle",
  status: "ready",
  children: [],
};

const tableData = [
  {
    id: 6273,
    principle: "FAIR Principles F1",
    principleAbbreviation: "FAIR F1",
    fairCategory: "F",
    status: "ready",
    metrics: [
      {
        id: 100,
        name: "Metric One",
        abbreviation: "M1",
        status: "ready",
        benchmarkCount: 1,
        benchmarks: [
          {
            id: 500,
            name: "Benchmark One",
            abbreviation: "B1",
          },
        ],
      },
    ],
  },
];

const benchmarkOptions = [
  {
    id: 500,
    name: "Benchmark One",
    abbreviation: "B1",
  },
  {
    id: 501,
    name: "Benchmark Two",
    abbreviation: "B2",
  },
];

describe("RegistryTable.vue", () => {
  let wrapper;
  let router;

  const createWrapper = async (query = {}) => {
    router = {
      replace: vi.fn(),
    };
    wrapper = shallowMount(RegistryTable, {
      global: {
        mocks: {
          $route: {
            path: "/registry/table",
            query,
          },
          $router: router,
        },

        stubs: {
          VSelect: {
            template: "<div></div>",
          },

          VDataTable: {
            template: "<div></div>",
          },
        },
      },
    });
    await flushPromises();
    return wrapper;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    axios.get.mockResolvedValue({
      data: apiResponse,
    });

    convertPrinciplesToTable.mockReturnValue(tableData);
    getBenchmarkOptions.mockReturnValue(benchmarkOptions);
    filterTableByBenchmark.mockReturnValue(tableData);
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  // --------------------------------------------------
  // BASIC COMPONENT
  // --------------------------------------------------

  it("can be instantiated", async () => {
    await createWrapper();

    expect(wrapper.vm.$options.name).toBe("RegistryTable");
  });

  it("uses 1236 as the default FAIRassist record", async () => {
    await createWrapper();

    expect(wrapper.vm.selectedFairassistID).toBe(1236);
  });

  it("finishes initialisation after mounting", async () => {
    await createWrapper();

    expect(wrapper.vm.initialising).toBe(false);
  });

  // --------------------------------------------------
  // COMPUTED
  // --------------------------------------------------

  describe("benchmarkOptions", () => {
    it("gets benchmark options from table data", async () => {
      await createWrapper();

      const result = wrapper.vm.benchmarkOptions;

      expect(getBenchmarkOptions).toHaveBeenCalledWith(wrapper.vm.tableData);

      expect(result).toEqual(benchmarkOptions);
    });
  });

  describe("filteredTableData", () => {
    it("filters table data using selected benchmark", async () => {
      await createWrapper();

      wrapper.vm.selectedBenchmark = 500;

      await wrapper.vm.$nextTick();

      const result = wrapper.vm.filteredTableData;

      expect(filterTableByBenchmark).toHaveBeenCalledWith(
        wrapper.vm.tableData,
        500,
      );

      expect(result).toEqual(tableData);
    });
  });

  // --------------------------------------------------
  // getGraphData
  // --------------------------------------------------

  describe("getGraphData", () => {
    it("requests graph data for the selected FAIRassist record", async () => {
      await createWrapper();

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("/search_utils/fairassist_components/1236"),
      );
    });

    it("converts the API response to table data", async () => {
      await createWrapper();

      expect(convertPrinciplesToTable).toHaveBeenCalledWith(apiResponse);

      expect(wrapper.vm.tableData).toEqual(tableData);
    });

    it("sets loading to false after a successful request", async () => {
      await createWrapper();

      expect(wrapper.vm.loading).toBe(false);
    });

    it("clears table data when the API request fails", async () => {
      await createWrapper();

      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      axios.get.mockRejectedValueOnce(new Error("API error"));

      wrapper.vm.tableData = tableData;

      await wrapper.vm.getGraphData();

      expect(wrapper.vm.tableData).toEqual([]);
      expect(wrapper.vm.loading).toBe(false);

      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  // --------------------------------------------------
  // restoreFromUrl
  // --------------------------------------------------

  describe("restoreFromUrl", () => {
    it("restores FAIR Principles from URL", async () => {
      await createWrapper({
        principle: "The FAIR Principles",
      });

      expect(wrapper.vm.selectedFairassistID).toBe(1236);
    });

    it("restores FAIR Principles for Research Software from URL", async () => {
      await createWrapper({
        principle: "FAIR Principles for Research Software",
      });

      expect(wrapper.vm.selectedFairassistID).toBe(4100);

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("/search_utils/fairassist_components/4100"),
      );
    });

    it("keeps the default record when principle URL value is invalid", async () => {
      await createWrapper({
        principle: "Unknown Principle",
      });

      expect(wrapper.vm.selectedFairassistID).toBe(1236);
    });

    it("restores benchmark using abbreviation", async () => {
      await createWrapper({
        principle: "The FAIR Principles",
        benchmark: "B1",
      });

      expect(wrapper.vm.selectedBenchmark).toBe(500);
    });

    it("restores benchmark using full benchmark name", async () => {
      await createWrapper({
        principle: "The FAIR Principles",
        benchmark: "Benchmark Two",
      });

      expect(wrapper.vm.selectedBenchmark).toBe(501);
    });

    it("sets benchmark to null when URL benchmark does not exist", async () => {
      await createWrapper({
        principle: "The FAIR Principles",
        benchmark: "UNKNOWN",
      });

      expect(wrapper.vm.selectedBenchmark).toBeNull();
    });
  });

  // --------------------------------------------------
  // updateUrl
  // --------------------------------------------------

  describe("updateUrl", () => {
    it("updates URL with the selected principle", async () => {
      await createWrapper();

      wrapper.vm.selectedFairassistID = 1236;
      wrapper.vm.selectedBenchmark = null;

      wrapper.vm.updateUrl();

      expect(router.replace).toHaveBeenCalledWith({
        path: "/registry/table",
        query: {
          principle: "The FAIR Principles",
        },
      });
    });

    it("updates URL with principle and benchmark abbreviation", async () => {
      await createWrapper();

      wrapper.vm.selectedFairassistID = 1236;
      wrapper.vm.selectedBenchmark = 500;

      wrapper.vm.updateUrl();

      expect(router.replace).toHaveBeenCalledWith({
        path: "/registry/table",
        query: {
          principle: "The FAIR Principles",
          benchmark: "B1",
        },
      });
    });

    it("uses benchmark name when abbreviation is unavailable", async () => {
      getBenchmarkOptions.mockReturnValue([
        {
          id: 600,
          name: "Benchmark Without Abbreviation",
          abbreviation: null,
        },
      ]);

      await createWrapper();
      wrapper.vm.initialising = true;
      wrapper.vm.selectedBenchmark = 600;
      await wrapper.vm.$nextTick();

      router.replace.mockClear();
      wrapper.vm.updateUrl();

      expect(router.replace).toHaveBeenCalledWith({
        path: "/registry/table",
        query: {
          principle: "The FAIR Principles",
          benchmark: "Benchmark Without Abbreviation",
        },
      });
    });
  });

  // --------------------------------------------------
  // filterByBenchmark
  // --------------------------------------------------

  describe("filterByBenchmark", () => {
    it("selects the benchmark", async () => {
      await createWrapper();

      wrapper.vm.initialising = true;

      wrapper.vm.filterByBenchmark(
        {
          id: 500,
          name: "Benchmark One",
        },
        100,
      );

      expect(wrapper.vm.selectedBenchmark).toBe(500);
    });

    it("closes the benchmark menu after filtering", async () => {
      await createWrapper();

      wrapper.vm.initialising = true;
      wrapper.vm.benchmarkMenus[100] = true;

      wrapper.vm.filterByBenchmark(
        {
          id: 500,
          name: "Benchmark One",
        },
        100,
      );

      expect(wrapper.vm.benchmarkMenus[100]).toBe(false);
    });
  });

  // --------------------------------------------------
  // WATCHERS
  // --------------------------------------------------

  describe("watch: selectedBenchmark", () => {
    it("updates URL when benchmark changes", async () => {
      await createWrapper();

      const updateUrlSpy = vi.spyOn(wrapper.vm, "updateUrl");

      wrapper.vm.initialising = false;
      wrapper.vm.selectedBenchmark = 500;

      await wrapper.vm.$nextTick();

      expect(updateUrlSpy).toHaveBeenCalled();
    });

    it("does not update URL during initialisation", async () => {
      await createWrapper();

      wrapper.vm.initialising = true;

      const updateUrlSpy = vi.spyOn(wrapper.vm, "updateUrl");

      wrapper.vm.selectedBenchmark = 500;

      await wrapper.vm.$nextTick();

      expect(updateUrlSpy).not.toHaveBeenCalled();
    });
  });

  describe("watch: selectedFairassistID", () => {
    it("clears selected benchmark when FAIRassist record changes", async () => {
      await createWrapper();

      wrapper.vm.initialising = true;
      wrapper.vm.selectedBenchmark = 500;

      await wrapper.vm.$nextTick();

      wrapper.vm.initialising = false;
      wrapper.vm.selectedFairassistID = 4100;

      await flushPromises();

      expect(wrapper.vm.selectedBenchmark).toBeNull();
    });

    it("loads new graph data when FAIRassist record changes", async () => {
      await createWrapper();

      vi.clearAllMocks();

      axios.get.mockResolvedValue({
        data: apiResponse,
      });

      convertPrinciplesToTable.mockReturnValue(tableData);

      wrapper.vm.initialising = false;
      wrapper.vm.selectedFairassistID = 4100;

      await flushPromises();

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("/search_utils/fairassist_components/4100"),
      );
    });

    it("updates URL when FAIRassist record changes", async () => {
      await createWrapper();

      const updateUrlSpy = vi.spyOn(wrapper.vm, "updateUrl");

      wrapper.vm.initialising = false;
      wrapper.vm.selectedFairassistID = 4100;

      await flushPromises();

      expect(updateUrlSpy).toHaveBeenCalled();
    });

    it("does nothing during initialisation", async () => {
      await createWrapper();

      const graphSpy = vi.spyOn(wrapper.vm, "getGraphData");

      const urlSpy = vi.spyOn(wrapper.vm, "updateUrl");

      wrapper.vm.initialising = true;
      wrapper.vm.selectedFairassistID = 4100;

      await flushPromises();

      expect(graphSpy).not.toHaveBeenCalled();
      expect(urlSpy).not.toHaveBeenCalled();
    });
  });
});
