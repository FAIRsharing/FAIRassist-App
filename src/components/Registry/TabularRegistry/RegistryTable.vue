<template>
  <v-data-table
      :headers="headers"
      :items="tableData"

  >
    <template #item.principle="{ item }">
      <div>
        <strong>{{ item.principleAbbreviation }}</strong>
        <div><a :href="fairsharingURL + item.id" target="_blank" rel="noopener noreferrer">{{ item.principle }}</a></div>
      </div>
    </template>

    <template #item.metrics="{ item }">
      <div
          v-for="metric in item.metrics"
          :key="metric.id"
          class="mb-2"
      >
        <a :href="fairsharingURL + metric.id" target="_blank" rel="noopener noreferrer">{{ metric.name }}</a>

        <strong>
          ({{ metric.benchmarkCount }}
          {{ metric.benchmarkCount === 1 ? "benchmark" : "benchmarks" }})
        </strong>
      </div>

      <span v-if="!item.metrics.length">
     -
    </span>
    </template>
  </v-data-table>
</template>
<script>
import axios from "axios";

export default {
  name: "RegistryTable",
  data: () => {
    return {
      noData: false,
      fairassistIDs: [1236, 4100],
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
  methods: {
    /**
     * Get the graph data from the API
     */
    async getGraphData() {
      try {
        const requests = this.fairassistIDs.map((id) => {
          const url =
              `${import.meta.env.VITE_API_ENDPOINT}` +
              `/search_utils/fairassist_components/${id}`;

          return axios.get(url);
        });

        const responses = await Promise.all(requests);

        // Keep the original responses if you still need them
        this.records = responses.map((response) => response.data);

        // Convert each tree and combine all rows into one array
        this.tableData = responses.flatMap((response) =>
            this.convertPrinciplesToTable(response.data),
        );

        this.noData = this.tableData.length === 0;
      } catch (error) {
        this.noData = true;
        this.tableData = [];
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