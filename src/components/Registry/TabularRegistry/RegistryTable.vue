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
        :items="tableData"
        :loading="loading"
    >
      <template #item.principle="{ item }">
        <div>
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

      <template #item.metrics="{ item }">
        <div
            v-for="metric in item.metrics"
            :key="metric.id"
            class="mb-2"
        >
          <a
              :href="fairsharingURL + metric.id"
              target="_blank"
              rel="noopener noreferrer"
          >
            {{ metric.name }}
          </a>

          <strong>
            ({{ metric.benchmarkCount }}
            {{ metric.benchmarkCount === 1 ? "benchmark" : "benchmarks" }})
          </strong>
        </div>

        <span v-if="!item.metrics.length">-</span>
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
      tableData:[],
      fairsharingURL: import.meta.env.VITE_FAIRSHARING_URL,
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
    }},
  mounted() {
    this.getGraphData();
  },
  watch: {
    selectedFairassistID() {
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
                const benchmarkCount = (metric.children || []).filter(
                    (child) => child.type === "benchmark",
                ).length;

                return {
                  id: metric.fairsharing_record_id,
                  name: metric.name,
                  abbreviation: metric.abbreviation,
                  status: metric.status,
                  benchmarkCount,
                  displayName: `${metric.name} (${benchmarkCount} ${
                      benchmarkCount === 1 ? "benchmark" : "benchmarks"
                  })`,
                };
              });

          // Always add the principle, even when metrics is []
          rows.push({
            id: node.fairsharing_record_id,
            principle: node.name,
            principleAbbreviation: node.abbreviation,
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
  }
}
</script>
<style scoped lang="scss">

</style>