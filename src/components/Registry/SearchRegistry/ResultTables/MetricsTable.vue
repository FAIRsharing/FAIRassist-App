<template>
  <div>
    <TableComponent :hideType="true" :itemList="store.getMetricsData" />
  </div>
</template>
<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import TableComponent from "../UtilComponents/TableComponent.vue";

export default {
  name: "MetricsTable",
  components: { TableComponent },
  setup() {
    const store = useAdvancedSearchStore();
    return { store };
  },
};
</script>
