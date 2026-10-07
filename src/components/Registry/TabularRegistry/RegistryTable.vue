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
      <template #loader>
        <v-progress-linear color="#27aae1" indeterminate height="2" />
      </template>
      <template #top>
        <div
          class="benchmark-filter pa-4 border-sm border-b-0 border-current border-opacity-100"
        >
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
        <div
          class="table-cell fair-cell"
          :class="item.fairCategory ? `fair-${item.fairCategory}` : ''"
        >
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
        <div
          class="table-cell fair-cell"
          :class="item.fairCategory ? `fair-${item.fairCategory}` : ''"
        >
          <div class="mobile-label">Metrics</div>
          <div v-for="metric in item.metrics" :key="metric.id" class="mb-2">
            <a
              :href="fairsharingURL + metric.id"
              target="_blank"
              rel="noopener noreferrer"
              :class="{
                'text-decoration-line-through': metric.status === 'deprecated',
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
                <v-card-title
                  class="text-subtitle-1 font-weight-bold pr-12 pb-0"
                >
                  Associated benchmarks
                </v-card-title>
                <v-list density="compact" class="pa-0">
                  <v-list-item
                    v-for="benchmark in metric.benchmarks"
                    :key="benchmark.id"
                  >
                    <div class="d-flex align-center">
                      <div class="flex-grow-1">
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
                      </div>

                      <v-tooltip
                        text="Filter table by this benchmark"
                        location="top"
                      >
                        <template #activator="{ props }">
                          <v-btn
                            v-bind="props"
                            icon
                            size="small"
                            variant="text"
                            :disabled="selectedBenchmark === benchmark.id"
                            :aria-label="
                              selectedBenchmark === benchmark.id
                                ? 'This benchmark is currently selected'
                                : 'Filter table by this benchmark'
                            "
                            @click.stop="
                              filterByBenchmark(benchmark, metric.id)
                            "
                          >
                            <v-icon size="small"> fas fa-filter </v-icon>
                          </v-btn>
                        </template>
                      </v-tooltip>
                    </div>
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
import {
  convertPrinciplesToTable,
  filterTableByBenchmark,
  getBenchmarkOptions,
} from "@/utils/fairassistUtils";

export default {
  name: "RegistryTable",
  data: () => {
    return {
      loading: false,
      fairassistRecords: [
        { title: "The FAIR Principles", value: 1236 },
        { title: "FAIR Principles for Research Software", value: 4100 },
      ],
      selectedFairassistID: 1236,
      tableData: [],
      fairsharingURL: import.meta.env.VITE_FAIRSHARING_URL,
      selectedBenchmark: null,
      benchmarkMenus: {},
      initialising: true, // Prevent watchers from modifying the URL while restoring state from the URL.
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

  computed: {
    benchmarkOptions() {
      return getBenchmarkOptions(this.tableData);
    },

    filteredTableData() {
      return filterTableByBenchmark(this.tableData, this.selectedBenchmark);
    },
  },

  watch: {
    async selectedFairassistID() {
      if (this.initialising) return;
      // Reset benchmark filter
      this.selectedBenchmark = null;
      // Load data for newly selected FAIRassist record
      await this.getGraphData();
      this.updateUrl();
    },
    selectedBenchmark() {
      if (this.initialising) return;
      this.updateUrl();
    },
  },

  async mounted() {
    await this.restoreFromUrl();
    this.initialising = false;
  },

  methods: {
    /**
     * Get the graph data from the API
     */
    async getGraphData() {
      this.loading = true;
      try {
        const url =
          `${import.meta.env.VITE_API_ENDPOINT}` +
          `/search_utils/fairassist_components/${this.selectedFairassistID}`;
        const response = await axios.get(url);
        this.tableData = convertPrinciplesToTable(response.data);
      } catch (error) {
        console.error(
          `Failed to load FAIRassist record ${this.selectedFairassistID}`,
          error,
        );
        this.tableData = [];
      } finally {
        this.loading = false;
      }
    },

    /**
     * Update the URL query parameters based on the selected FAIRassist record and benchmark.
     * This allows users to share links that reflect their current selections.
     */
    updateUrl() {
      const selectedRecord = this.fairassistRecords.find(
        (record) => record.value === this.selectedFairassistID,
      );

      const selectedBenchmark = this.benchmarkOptions.find(
        (benchmark) => benchmark.id === this.selectedBenchmark,
      );

      const query = {};

      if (selectedRecord) {
        query.principle = selectedRecord.title;
      }

      if (selectedBenchmark) {
        query.benchmark =
          selectedBenchmark.abbreviation || selectedBenchmark.name;
      }

      this.$router.replace({
        path: this.$route.path,
        query,
      });
    },

    /**
     * Restore selections from a shared URL.
     */
    async restoreFromUrl() {
      const principleName = this.$route.query.principle;
      const benchmarkName = this.$route.query.benchmark;
      /*
       * Restore the FAIRassist principle from its name.
       * URL:principle=The+FAIR+Principles
       * Internal value:selectedFairassistID = 1236
       */
      if (principleName) {
        const record = this.fairassistRecords.find(
          (item) => item.title === principleName,
        );

        if (record) {
          this.selectedFairassistID = record.value;
        }
      }
      // Load data first so benchmarkOptions is populated
      await this.getGraphData();

      /*
       * Restore benchmark from abbreviation or full name.
       * URL:benchmark=FB-CDC
       * Internal value:selectedBenchmark = 7609
       */
      if (benchmarkName) {
        const benchmark = this.benchmarkOptions.find(
          (item) =>
            item.abbreviation === benchmarkName || item.name === benchmarkName,
        );

        this.selectedBenchmark = benchmark ? benchmark.id : null;
      }
    },

    /**
     * Filters and selects a specific benchmark based on the provided benchmark object and metric ID.
     * Updates the selected benchmark and closes the corresponding benchmark menu.
     *
     * @param {Object} benchmark - The benchmark object containing the benchmark details.
     * @param {string|number} metricId - The ID of the metric associated with the benchmark menu to be closed.
     * @return {void} This method does not return a value.
     */
    filterByBenchmark(benchmark, metricId) {
      this.selectedBenchmark = benchmark.id;

      // Close the benchmark menu
      this.benchmarkMenus[metricId] = false;
    },
  },
};
</script>
<style scoped lang="scss">
.deprecated-label {
  margin-left: 5px;
  font-weight: bold;
}
.fairassist-table {
  font-size: clamp(0.875rem, 1.2vw, 1rem);
  :deep(table) {
    border-collapse: collapse;

    th,
    td {
      width: 50%;
      border: 1px solid #000 !important;
      vertical-align: top;
      padding: 0 !important;
      overflow-wrap: break-word;
    }

    th {
      font-weight: bold;
      font-size: 1.2rem !important;
      text-transform: uppercase;
      padding: 12px !important;
      text-align: center !important;
      vertical-align: middle !important;
      .v-data-table-header__content {
        font-size: 1.2rem !important;
        justify-content: center;
      }
    }
  }
}

/* Mobile */
@media (max-width: 600px) {
  .fairassist-table {
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
        overflow: hidden;
      }

      td {
        border: none;
        border-bottom: 1px solid #000;
        padding: 12px;

        &:last-child {
          border-top: none !important;
        }
      }
    }
    .benchmark-filter {
      border: none !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
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

.fair-cell {
  height: 100%;
  padding: 12px;
}

.fair-F {
  background-color: #e3f2fd;
  a {
    color: #006097;
  }
}

.fair-A {
  background-color: #d8ebe8;
  a {
    color: #245f57;
  }
}

.fair-I {
  background-color: #ffead0;
  a {
    color: #7a4300;
  }
}

.fair-R {
  background-color: #efd9d7;
  a {
    color: #743733;
  }
}
</style>
