<template>
  <div class="mb-4">
  This is a tabular view of principles and related metrics. You can also explore our faceted search of the same content" with "faceted search" as a link to the original visualisation.

  <v-btn color="primary" to="/registry/search">Search Registry</v-btn>
  </div>
  <RegistryTable />
  </template>
<script>
import RegistryTable from "@/components/Registry/TabularRegistry/RegistryTable.vue";
export default {
  name: "TabularRegistryView",
components: {
  RegistryTable,
}
}
</script>
<style scoped lang="scss">

</style>