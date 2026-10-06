<template>
  <div>
    <TableComponent :itemList="store.getCollectionsData" />
  </div>
</template>
<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import TableComponent from "../UtilComponents/TableComponent.vue";

export default {
  name: "CollectionsTable",
  components: { TableComponent },
  setup() {
    const store = useAdvancedSearchStore();
    return { store };
  },
};
</script>
