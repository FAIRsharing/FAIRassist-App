<template>
  <div>
    <v-select
      v-model="selectedFairassistID"
      :items="fairassistRecords"
      item-title="title"
      item-value="value"
      label="Select FAIRassist record"
      variant="outlined"
      density="compact"
      class="mb-4"
    />

    <v-data-table
      :headers="headers"
      :items="filteredTableData"
      :loading="loading"
      class="fairassist-table"
    >
      <template #top>
        <div class="benchmark-filter pa-4">
          <v-autocomplete
            v-model="selectedBenchmark"
            :items="benchmarkOptions"
            item-title="name"
            item-value="id"
            label="Filter by benchmark"
            placeholder="Search benchmarks"
            variant="outlined"
            density="compact"
            clearable
            hide-details
          />
        </div>
      </template>
      <!-- Principles -->
      <template #item.principle="{ item }">
        <div class="table-cell">
          <div class="mobile-label">Principle</div>
          <strong>{{ item.principleAbbreviation }}</strong>
          <div>
            <a
              :href="fairsharingURL + item.id"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ item.principle }}
            </a>
          </div>
        </div>
      </template>
      <!-- Metric -->
      <template #item.metrics="{ item }">
        <div class="table-cell">
          <div class="mobile-label">Metrics</div>
          <div
            v-for="metric in item.metrics"
            :key="metric.id"
            class="mb-2"
            :class="{ 'deprecated-metric': metric.status === 'deprecated' }"
          >
            <a
              :href="fairsharingURL + metric.id"
              target="_blank"
              rel="noopener noreferrer"
              :class="{
                'deprecated-metric-link': metric.status === 'deprecated',
              }"
            >
              {{ metric.name }}
            </a>
            <!-- Benchmarks -->
            <v-menu
              v-if="metric.benchmarkCount > 0"
              v-model="benchmarkMenus[metric.id]"
              location="bottom"
              :close-on-content-click="false"
            >
              <template #activator="{ props }">
                (
                <strong v-bind="props" class="benchmark-count ml-1">
                  {{ metric.benchmarkCount }}
                  {{ metric.benchmarkCount === 1 ? "benchmark" : "benchmarks" }}
                </strong>
                )
              </template>

              <v-card
                class="benchmark-menu prelative"
                max-width="500"
                min-width="300"
              >
                <!-- Close button -->
                <v-btn
                  class="benchmark-menu-close pabsolute"
                  icon
                  size="small"
                  variant="text"
                  aria-label="Close benchmark menu"
                  @click="benchmarkMenus[metric.id] = false"
                >
                  <v-icon>fas fa-times</v-icon>
                </v-btn>
                <v-card-title class="text-subtitle-1 font-weight-bold pr-12">
                  Associated benchmarks
                </v-card-title>
                <v-list density="compact" class="pa-0">
                  <v-list-item
                    v-for="benchmark in metric.benchmarks"
                    :key="benchmark.id"
                  >
                    <v-list-item-title class="benchmark-name">
                      <a
                        :href="fairsharingURL + benchmark.id"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {{ benchmark.name }}
                      </a>
                    </v-list-item-title>

                    <v-list-item-subtitle v-if="benchmark.abbreviation">
                      {{ benchmark.abbreviation }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>

            <span v-else> (0 benchmarks) </span>

            <span
              v-if="metric.status === 'deprecated'"
              class="deprecated-label"
            >
              [Deprecated]
            </span>
          </div>

          <span v-if="!item.metrics.length">-</span>
        </div>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "RegistryTable",
  data: () => {
    return {
      loading: false,
      noData: false,
      fairassistRecords: [
        { title: "The FAIR Principles", value: 1236 },
        { title: "FAIR Principles for Research Software", value: 4100 },
      ],
      selectedFairassistID: 1236,
      tableData: [],
      fairsharingURL: import.meta.env.VITE_FAIRSHARING_URL,
      selectedBenchmark: null,
      benchmarkMenus: {},
      headers: [
        {
          title: "Principles",
          key: "principle",
          sortable: false,
        },
        {
          title: "Metrics",
          key: "metrics",
          sortable: false,
        },
      ],
    };
  },
  mounted() {
    this.getGraphData();
  },
  computed: {
    benchmarkOptions() {
      const benchmarks = new Map();

      this.tableData.forEach((principle) => {
        principle.metrics.forEach((metric) => {
          metric.benchmarks.forEach((benchmark) => {
            benchmarks.set(benchmark.id, benchmark);
          });
        });
      });

      return Array.from(benchmarks.values()).sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    },

    filteredTableData() {
      if (!this.selectedBenchmark) {
        return this.tableData;
      }

      return this.tableData
        .map((principle) => {
          const metrics = principle.metrics.filter((metric) =>
            metric.benchmarks.some(
              (benchmark) => benchmark.id === this.selectedBenchmark,
            ),
          );

          return {
            ...principle,
            metrics,
          };
        })
        .filter((principle) => principle.metrics.length > 0);
    },
  },
  watch: {
    selectedFairassistID() {
      // Reset benchmark filter
      this.selectedBenchmark = null;
      // Load data for newly selected FAIRassist record
      this.getGraphData();
    },
  },
  methods: {
    /**
     * Get the graph data from the API
     */
    async getGraphData() {
      this.loading = true;
      this.noData = false;
      try {
        const url =
          `${import.meta.env.VITE_API_ENDPOINT}` +
          `/search_utils/fairassist_components/${this.selectedFairassistID}`;
        const response = await axios.get(url);
        this.tableData = this.convertPrinciplesToTable(response.data);
        this.noData = this.tableData.length === 0;
      } catch (error) {
        console.error(
          `Failed to load FAIRassist record ${this.selectedFairassistID}`,
          error,
        );
        this.tableData = [];
        this.noData = true;
      } finally {
        this.loading = false;
      }
    },

    convertPrinciplesToTable(data) {
      const rows = [];

      const walk = (node) => {
        if (!node) return;

        if (node.type === "principle") {
          const metrics = (node.children || [])
            .filter((child) => child.type === "metric")
            .map((metric) => {
              const benchmarks = (metric.children || [])
                .filter((child) => child.type === "benchmark")
                .map((benchmark) => ({
                  id: benchmark.fairsharing_record_id,
                  name: benchmark.name,
                  abbreviation: benchmark.abbreviation,
                }));

              return {
                id: metric.fairsharing_record_id,
                name: metric.name,
                abbreviation: metric.abbreviation,
                status: metric.status,
                benchmarks,
                benchmarkCount: benchmarks.length,
                displayName: `${metric.name} (${benchmarks.length} ${
                  benchmarks.length === 1 ? "benchmark" : "benchmarks"
                })`,
              };
            });

          // Always add the principle, even when metrics is []
          rows.push({
            id: node.fairsharing_record_id,
            principle: node.name,
            principleAbbreviation: node.abbreviation,
            status: node.status,
            metrics,
          });
        }

        // Continue looking for nested principles
        (node.children || [])
          .filter((child) => child.type === "principle")
          .forEach(walk);
      };

      walk(data);

      return rows;
    },
  },
};
</script>
<style scoped lang="scss">
.deprecated-metric,
.deprecated-metric strong {
  color: grey;
}

.deprecated-metric-link {
  color: grey !important;
}

.deprecated-label {
  margin-left: 5px;
  color: grey;
  font-weight: bold;
}
.fairassist-table {
  border: 1px solid #000;

  :deep(table) {
    border-collapse: collapse;

    th,
    td {
      border: 1px solid #000 !important;
      padding: 12px 16px;
      vertical-align: top;
    }

    th {
      font-weight: bold;
    }
  }
}

/* Mobile */
@media (max-width: 600px) {
  .fairassist-table {
    border: none;

    :deep(table) {
      display: block;

      thead {
        display: none;
      }

      tbody,
      tr,
      td {
        display: block;
        width: 100%;
        height: 100% !important;
      }

      tr {
        margin-bottom: 16px;
        border: 1px solid #000;
        overflow: hidden;
      }

      td {
        border: none;
        border-bottom: 1px solid #000;
        padding: 12px;

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
.mobile-label {
  display: none;
  margin-bottom: 6px;
  font-weight: bold;
}

@media (max-width: 600px) {
  .mobile-label {
    display: block;
  }
}

.benchmark-count {
  cursor: pointer;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 3px;
  &:hover {
    opacity: 0.8;
  }
}

.benchmark-menu {
  max-height: 400px;
  overflow-y: auto;
  .benchmark-menu-close {
    top: 4px;
    right: 4px;
    z-index: 1;
  }
}

.benchmark-name {
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
}
</style>
