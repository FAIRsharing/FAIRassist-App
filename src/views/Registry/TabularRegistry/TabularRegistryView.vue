<template>
This is tabular view of registry
  <v-btn color="primary" to="/registry/browse">Search Registry</v-btn>
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