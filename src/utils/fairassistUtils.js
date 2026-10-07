/**
 * Determine F/A/I/R palette from principle abbreviation.
 * Examples:
 * FAIR - F-> F
 * FAIR4RS - A-> A
 * FAIR F1-> F
 * FAIR A1.2-> A
 * FAIR I3-> I
 * FAIR R1.1-> R
 * @param abbreviation
 * @return {string|null}
 */
export function getFairCategory(abbreviation) {
  if (!abbreviation) return null;

  const value = abbreviation.toUpperCase().trim();

  // Group headings: "FAIR - F", "FAIR4RS - F", etc.
  const groupMatch = value.match(/-\s*([FAIR])$/);

  if (groupMatch) {
    return groupMatch[1];
  }

  // Individual principles: "FAIR F1", "FAIR F1-PID",
  // "FAIR A1.2", "FAIR I3", "FAIR R1.1", etc.
  const principleMatch = value.match(/\b([FAIR])\d/);

  if (principleMatch) {
    return principleMatch[1];
  }

  return null;
}

/**
 * Extract benchmarks from a metric.
 * @param {Array} children
 * @returns {Array}
 */

export function getBenchmarks(children = []) {
  return children
    .filter((child) => child.type === "benchmark")
    .map((benchmark) => ({
      id: benchmark.fairsharing_record_id,
      name: benchmark.name,
      abbreviation: benchmark.abbreviation,
    }));
}

/**
 * Extract metrics and their associated benchmarks from the provided children array.
 * @param children
 * @return {Object}
 */
export function getMetrics(children = []) {
  return children
    .filter((child) => child.type === "metric")
    .map((metric) => {
      const benchmarks = getBenchmarks(metric.children);

      return {
        id: metric.fairsharing_record_id,
        name: metric.name,
        abbreviation: metric.abbreviation,
        status: metric.status,
        benchmarks,
        benchmarkCount: benchmarks.length,
      };
    });
}

/**
 * Convert the nested principles and metrics data into a flat table structure for display.
 * @param data
 * @return {Array}
 */
export function convertPrinciplesToTable(data) {
  const rows = [];

  const walk = (node) => {
    if (!node) return;

    if (node.type === "principle") {
      // Always add the principle, even when metrics is []
      rows.push({
        id: node.fairsharing_record_id,
        principle: node.name,
        principleAbbreviation: node.abbreviation,
        status: node.status,
        fairCategory: getFairCategory(node.abbreviation),
        metrics: getMetrics(node.children),
      });
    }

    // Continue looking for nested principles
    for (const child of node.children ?? []) {
      if (child.type === "principle") {
        walk(child);
      }
    }
  };

  walk(data);

  return rows;
}

/**
 * Build a unique, alphabetically sorted list of benchmarks from the table data.
 * @param {Array} tableData
 * @returns {Array}
 */

export function getBenchmarkOptions(tableData = []) {
  const benchmarks = new Map();
  for (const principle of tableData) {
    for (const metric of principle.metrics ?? []) {
      for (const benchmark of metric.benchmarks ?? []) {
        benchmarks.set(benchmark.id, benchmark);
      }
    }
  }
  return [...benchmarks.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Filter table rows using a benchmark ID.
 *
 * Only metrics associated with the selected benchmark are retained.
 * Principles without matching metrics are removed.
 * @param {Array} tableData
 * @param {number|null} selectedBenchmark
 * @returns {Array}
 */
export function filterTableByBenchmark(
  tableData = [],
  selectedBenchmark = null,
) {
  if (!selectedBenchmark) {
    return tableData;
  }
  return tableData
    .map((principle) => {
      const metrics = principle.metrics.filter((metric) =>
        metric.benchmarks.some(
          (benchmark) => benchmark.id === selectedBenchmark,
        ),
      );

      return {
        ...principle,
        metrics,
      };
    })
    .filter((principle) => principle.metrics.length > 0);
}
