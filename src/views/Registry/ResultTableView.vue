<template>
  <v-row>
    <!-- Standards -->
    <v-col class="pt-0" cols="12" lg="6" md="12" sm="12" xl="4" xs="12">
      <v-card class="d-flex flex-column rounded-0" height="100%">
        <v-card-title class="bg-primary text-white py-3">
          Standards
        </v-card-title>
        <v-card-text class="pa-0" style="flex-grow: 1">
          <StandardsTable />
        </v-card-text>
      </v-card>
    </v-col>
    <!-- Database -->
    <v-col class="pt-0" cols="12" lg="6" md="12" sm="12" xl="4" xs="12">
      <v-card class="d-flex flex-column rounded-0" height="100%">
        <v-card-title class="bg-primary text-white py-3">
          Database
        </v-card-title>
        <v-card-text class="pa-0" style="flex-grow: 1">
          <DatabaseTable />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import {
  DatabaseTable,
  StandardsTable,
} from "@/components/Registry/ResultTables";

export default {
  name: "ResultTableView",
  components: {
    StandardsTable,
    DatabaseTable,
  },
};
</script>
