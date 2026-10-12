import { describe, expect, it } from "vitest";

import {
  convertPrinciplesToTable,
  filterTableByBenchmark,
  getBenchmarkOptions,
  getBenchmarks,
  getFairCategory, getFairCellProps,
  getMetrics,
} from "@/utils/fairassistUtils";

const benchmark1 = {
  fairsharing_record_id: 501,
  name: "Benchmark One",
  abbreviation: "B1",
  type: "benchmark",
  status: "ready",
  children: [],
};

const benchmark2 = {
  fairsharing_record_id: 502,
  name: "Benchmark Two",
  abbreviation: "B2",
  type: "benchmark",
  status: "ready",
  children: [],
};

const metric1 = {
  fairsharing_record_id: 101,
  name: "Metric One",
  abbreviation: "M1",
  type: "metric",
  status: "ready",
  children: [benchmark1, benchmark2],
};

const metric2 = {
  fairsharing_record_id: 102,
  name: "Metric Two",
  abbreviation: "M2",
  type: "metric",
  status: "deprecated",
  children: [],
};

const metric3 = {
  fairsharing_record_id: 103,
  name: "Metric Three",
  abbreviation: "M3",
  type: "metric",
  status: "ready",
  children: [benchmark1],
};

const apiData = {
  fairsharing_record_id: 1236,
  name: "The FAIR Principles",
  abbreviation: "FAIR",
  type: "principle",
  status: "ready",

  children: [
    {
      fairsharing_record_id: 200,
      name: "FAIR Principles - Findable",
      abbreviation: "FAIR - F",
      type: "principle",
      status: "ready",

      children: [
        {
          fairsharing_record_id: 201,
          name: "FAIR Principle F1",
          abbreviation: "FAIR F1",
          type: "principle",
          status: "ready",
          children: [metric1, metric2],
        },
      ],
    },

    {
      fairsharing_record_id: 300,
      name: "FAIR Principles - Accessible",
      abbreviation: "FAIR - A",
      type: "principle",
      status: "ready",

      children: [
        {
          fairsharing_record_id: 301,
          name: "FAIR Principle A1",
          abbreviation: "FAIR A1",
          type: "principle",
          status: "ready",
          children: [metric3],
        },
      ],
    },
  ],
};

describe("fairassistUtils", () => {
  describe("getFairCategory", () => {
    it("returns category for FAIR group headings", () => {
      expect(getFairCategory("FAIR - F")).toBe("F");
      expect(getFairCategory("FAIR - A")).toBe("A");
      expect(getFairCategory("FAIR - I")).toBe("I");
      expect(getFairCategory("FAIR - R")).toBe("R");
    });

    it("supports FAIR4RS group headings", () => {
      expect(getFairCategory("FAIR4RS - F")).toBe("F");
      expect(getFairCategory("FAIR4RS - A")).toBe("A");
      expect(getFairCategory("FAIR4RS - I")).toBe("I");
      expect(getFairCategory("FAIR4RS - R")).toBe("R");
    });

    it("returns category for individual principles", () => {
      expect(getFairCategory("FAIR F1")).toBe("F");
      expect(getFairCategory("FAIR F1-PID")).toBe("F");
      expect(getFairCategory("FAIR A1.2")).toBe("A");
      expect(getFairCategory("FAIR I3")).toBe("I");
      expect(getFairCategory("FAIR R1.1")).toBe("R");
    });

    it("is case insensitive", () => {
      expect(getFairCategory("fair f1")).toBe("F");
      expect(getFairCategory("fair a1")).toBe("A");
    });

    it("returns null for root FAIR principle", () => {
      expect(getFairCategory("FAIR")).toBeNull();
    });

    it("returns null for empty values", () => {
      expect(getFairCategory()).toBeNull();
      expect(getFairCategory(null)).toBeNull();
      expect(getFairCategory("")).toBeNull();
    });
  });

  describe("getBenchmarks", () => {
    it("extracts benchmark records", () => {
      const result = getBenchmarks([benchmark1, benchmark2]);

      expect(result).toEqual([
        {
          id: 501,
          name: "Benchmark One",
          abbreviation: "B1",
        },
        {
          id: 502,
          name: "Benchmark Two",
          abbreviation: "B2",
        },
      ]);
    });

    it("ignores non-benchmark records", () => {
      const result = getBenchmarks([
        benchmark1,
        metric1,
        {
          type: "principle",
          fairsharing_record_id: 999,
        },
      ]);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(501);
    });

    it("returns an empty array when there are no benchmarks", () => {
      expect(getBenchmarks([])).toEqual([]);
    });

    it("uses an empty array when no argument is provided", () => {
      expect(getBenchmarks()).toEqual([]);
    });
  });

  describe("getMetrics", () => {
    it("extracts metrics", () => {
      const result = getMetrics([metric1, metric2]);

      expect(result).toHaveLength(2);

      expect(result[0]).toEqual({
        id: 101,
        name: "Metric One",
        abbreviation: "M1",
        status: "ready",

        benchmarks: [
          {
            id: 501,
            name: "Benchmark One",
            abbreviation: "B1",
          },
          {
            id: 502,
            name: "Benchmark Two",
            abbreviation: "B2",
          },
        ],

        benchmarkCount: 2,
      });
    });

    it("preserves deprecated metric status", () => {
      const result = getMetrics([metric2]);

      expect(result[0].status).toBe("deprecated");
    });

    it("returns benchmark count", () => {
      const result = getMetrics([metric1, metric2]);

      expect(result[0].benchmarkCount).toBe(2);
      expect(result[1].benchmarkCount).toBe(0);
    });

    it("ignores non-metric children", () => {
      const result = getMetrics([
        metric1,
        benchmark1,
        {
          type: "principle",
          fairsharing_record_id: 999,
        },
      ]);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(101);
    });

    it("returns an empty array when no metrics exist", () => {
      expect(getMetrics([])).toEqual([]);
      expect(getMetrics()).toEqual([]);
    });
  });

  describe("convertPrinciplesToTable", () => {
    it("converts the hierarchy into flat table rows", () => {
      const result = convertPrinciplesToTable(apiData);

      expect(result).toHaveLength(5);
    });

    it("includes the root principle", () => {
      const result = convertPrinciplesToTable(apiData);

      expect(result[0]).toMatchObject({
        id: 1236,
        principle: "The FAIR Principles",
        principleAbbreviation: "FAIR",
        status: "ready",
        fairCategory: null,
      });
    });

    it("handles a principle with undefined children", () => {
      const data = {
        fairsharing_record_id: 1236,
        name: "The FAIR Principles",
        abbreviation: "FAIR",
        type: "principle",
        status: "ready",
        // children intentionally omitted
      };
      const result = convertPrinciplesToTable(data);

      expect(result[0]).toMatchObject({
        id: 1236,
        principle: "The FAIR Principles",
        principleAbbreviation: "FAIR",
        status: "ready",
        fairCategory: null,
        metrics: [],
      });
    });

    it("includes nested principles", () => {
      const result = convertPrinciplesToTable(apiData);

      expect(result.some((item) => item.id === 201)).toBe(true);

      expect(result.some((item) => item.id === 301)).toBe(true);
    });

    it("assigns FAIR categories", () => {
      const result = convertPrinciplesToTable(apiData);

      const findable = result.find((item) => item.id === 200);

      const accessible = result.find((item) => item.id === 300);

      expect(findable.fairCategory).toBe("F");
      expect(accessible.fairCategory).toBe("A");
    });

    it("associates metrics with their immediate principle", () => {
      const result = convertPrinciplesToTable(apiData);

      const f1 = result.find((item) => item.id === 201);

      expect(f1.metrics).toHaveLength(2);

      expect(f1.metrics[0].id).toBe(101);
      expect(f1.metrics[1].id).toBe(102);
    });

    it("keeps principles that have no metrics", () => {
      const result = convertPrinciplesToTable(apiData);

      const findable = result.find((item) => item.id === 200);

      expect(findable).toBeDefined();
      expect(findable.metrics).toEqual([]);
    });

    it("returns an empty array for missing data", () => {
      expect(convertPrinciplesToTable(null)).toEqual([]);
      expect(convertPrinciplesToTable()).toEqual([]);
    });
  });

  describe("getBenchmarkOptions", () => {
    it("returns unique benchmarks", () => {
      const tableData = [
        {
          metrics: [
            {
              benchmarks: [
                {
                  id: 501,
                  name: "Benchmark One",
                  abbreviation: "B1",
                },
              ],
            },
          ],
        },

        {
          metrics: [
            {
              benchmarks: [
                {
                  id: 501,
                  name: "Benchmark One",
                  abbreviation: "B1",
                },
                {
                  id: 502,
                  name: "Benchmark Two",
                  abbreviation: "B2",
                },
              ],
            },
          ],
        },
      ];

      const result = getBenchmarkOptions(tableData);

      expect(result).toHaveLength(2);

      expect(result.map((item) => item.id)).toEqual([501, 502]);
    });

    it("sorts benchmarks alphabetically by name", () => {
      const tableData = [
        {
          metrics: [
            {
              benchmarks: [
                {
                  id: 2,
                  name: "Zulu Benchmark",
                },
                {
                  id: 1,
                  name: "Alpha Benchmark",
                },
              ],
            },
          ],
        },
      ];

      const result = getBenchmarkOptions(tableData);

      expect(result.map((item) => item.name)).toEqual([
        "Alpha Benchmark",
        "Zulu Benchmark",
      ]);
    });

    it("returns an empty array for empty data", () => {
      expect(getBenchmarkOptions([])).toEqual([]);
      expect(getBenchmarkOptions()).toEqual([]);
    });

    it("handles principles with no metrics", () => {
      expect(
        getBenchmarkOptions([
          {
            metrics: [],
          },
        ]),
      ).toEqual([]);
    });

    it("ignores missing metrics and benchmarks while returning valid benchmarks", () => {
      const tableData = [
        {
          metrics: null,
        },
        {
          metrics: [
            {
              benchmarks: null,
            },
            {
              benchmarks: [
                {
                  id: 501,
                  name: "Benchmark One",
                  abbreviation: "B1",
                },
              ],
            },
          ],
        },
      ];

      expect(getBenchmarkOptions(tableData)).toEqual([
        {
          id: 501,
          name: "Benchmark One",
          abbreviation: "B1",
        },
      ]);
    });
  });

  describe("filterTableByBenchmark", () => {
    const tableData = [
      {
        id: 201,
        principle: "FAIR F1",
        metrics: [
          {
            id: 101,
            name: "Metric One",
            benchmarks: [
              {
                id: 501,
                name: "Benchmark One",
              },
            ],
          },
          {
            id: 102,
            name: "Metric Two",
            benchmarks: [
              {
                id: 502,
                name: "Benchmark Two",
              },
            ],
          },
        ],
      },

      {
        id: 301,
        principle: "FAIR A1",
        metrics: [
          {
            id: 103,
            name: "Metric Three",
            benchmarks: [
              {
                id: 501,
                name: "Benchmark One",
              },
            ],
          },
        ],
      },

      {
        id: 401,
        principle: "FAIR I1",
        metrics: [],
      },
    ];

    it("returns all table data when no benchmark is selected", () => {
      const result = filterTableByBenchmark(tableData, null);

      expect(result).toBe(tableData);
    });

    it("filters metrics by benchmark", () => {
      const result = filterTableByBenchmark(tableData, 501);

      expect(result).toHaveLength(2);

      expect(result[0].metrics).toHaveLength(1);
      expect(result[0].metrics[0].id).toBe(101);

      expect(result[1].metrics).toHaveLength(1);
      expect(result[1].metrics[0].id).toBe(103);
    });

    it("removes principles without matching metrics", () => {
      const result = filterTableByBenchmark(tableData, 502);

      expect(result).toHaveLength(1);

      expect(result[0].id).toBe(201);
      expect(result[0].metrics[0].id).toBe(102);
    });

    it("returns an empty array when no metrics match", () => {
      const result = filterTableByBenchmark(tableData, 999);

      expect(result).toEqual([]);
    });

    it("does not mutate the original metric arrays", () => {
      const originalLength = tableData[0].metrics.length;

      filterTableByBenchmark(tableData, 501);

      expect(tableData[0].metrics).toHaveLength(originalLength);
    });

    it("handles empty table data", () => {
      expect(filterTableByBenchmark([], 501)).toEqual([]);

      expect(filterTableByBenchmark(undefined, 501)).toEqual([]);
    });
  });

  describe("getFairCellProps", () => {
    it.each([
      ["F", "fair-cell-bg fair-F"],
      ["A", "fair-cell-bg fair-A"],
      ["I", "fair-cell-bg fair-I"],
      ["R", "fair-cell-bg fair-R"],
    ])("returns correct class for %s", (category, expected) => {
      expect(
          getFairCellProps({
            item: { fairCategory: category },
          }),
      ).toEqual({
        class: expected,
      });
    });

    it("returns base class when category is missing", () => {
      expect(
          getFairCellProps({
            item: { fairCategory: null },
          }),
      ).toEqual({
        class: "fair-cell-bg",
      });
    });
  });
});
