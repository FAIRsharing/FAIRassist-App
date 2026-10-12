<template>
  <div>
    <TableComponent :itemList="store.getPrinciplesData" :hideType="true" />
  </div>
</template>
<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import TableComponent from "../UtilComponents/TableComponent.vue";

export default {
  name: "PrinciplesTable",
  components: { TableComponent },
  setup() {
    const store = useAdvancedSearchStore();
    return { store };
  },
};
</script>
