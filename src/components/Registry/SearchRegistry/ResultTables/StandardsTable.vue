<template>
  <div>
    <TableComponent :itemList="store.getStandardsData" />
  </div>
</template>
<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import TableComponent from "../UtilComponents/TableComponent.vue";

export default {
  name: "StandardsTable",
  components: { TableComponent },
  setup() {
    const store = useAdvancedSearchStore();
    return { store };
  },
};
</script>
