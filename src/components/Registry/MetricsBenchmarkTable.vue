<template>
  <div>
    <v-data-table
      v-if="store.getAdvancedSearchResponse.length"
      :headers="headers"
      :items="store.getAdvancedSearchResponse"
      item-value="resource"
      mobile-breakpoint="sm"
    >
      <template #item.name="{ item }">
        <a :href="item.homepage" rel="noopener noreferrer" target="_blank">
          {{ item.name }}
        </a>
      </template>
    </v-data-table>
    <div class="text-center" else>{{ noData }}</div>
  </div>
</template>
<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

export default {
  name: "MetricsBenchmarkTable",
  data() {
    return {
      headers: [
        {
          title: "Name",
          value: "name",
          align: "center",
          key: "name",
        },
        {
          title: "Type",
          value: "type",
          align: "center",
          key: "type",
        },
      ],
      resources: [],
      loading: false,
    };
  },

  setup() {
    const store = useAdvancedSearchStore();
    return { store };
  },
  computed: {
    noData() {
      if (this.store.getNoData) {
        return "No data available";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
:deep {
  table {
    thead tr th {
      background-color: #8dbdd8;
      border-right: 1px solid white;
      font-size: 1.3em;
      color: white;
      line-height: 1.2em;

      &:last-child {
        border-right: none;
      }
    }

    tbody tr {
      &:nth-child(odd) {
        background-color: rgba(0, 0, 0, 0.05);
      }

      td {
        padding: 16px !important;
        border-right: 1px solid white;

        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>
