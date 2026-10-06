<template>
  <div class="d-flex flex-column flex-md-row align-md-center ga-4 mb-6">
    <p class="ma-0">You’re viewing FAIRassist’s principles, metrics and benchmarks in a tabular view. You can also explore the same content using faceted search.</p>

  <v-btn color="primary" to="/registry/search" class="flex-shrink-0">Search Registry</v-btn>
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