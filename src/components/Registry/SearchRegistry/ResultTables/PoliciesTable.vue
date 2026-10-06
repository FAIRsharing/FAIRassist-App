<template>
  <div>
    <TableComponent :itemList="store.getPoliciesData" />
  </div>
</template>
<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import TableComponent from "../UtilComponents/TableComponent.vue";

export default {
  name: "PoliciesTable",
  components: { TableComponent },
  setup() {
    const store = useAdvancedSearchStore();
    return { store };
  },
};
</script>
