<template>
  <v-row v-if="store.getAdvancedSearchResponse.length">
    <!-- Metrics -->
    <v-col class="pt-0" cols="12" lg="6" md="12" sm="12" xl="4" xs="12">
      <v-card class="d-flex flex-column rounded-0" height="100%">
        <v-card-title class="bg-primary text-white text-center">
          Metrics
        </v-card-title>
        <v-card-text class="pa-0" style="flex-grow: 1">
          <MetricsTable />
        </v-card-text>
      </v-card>
    </v-col>
    <!-- Benchmarks -->
    <v-col class="pt-0" cols="12" lg="6" md="12" sm="12" xl="4" xs="12">
      <v-card class="d-flex flex-column rounded-0" height="100%">
        <v-card-title class="bg-primary text-white text-center">
          Benchmarks
        </v-card-title>
        <v-card-text class="pa-0" style="flex-grow: 1">
          <BenchmarksTable />
        </v-card-text>
      </v-card>
    </v-col>
    <!-- Principles -->
    <v-col class="pt-0" cols="12" lg="6" md="12" sm="12" xl="4" xs="12">
      <v-card class="d-flex flex-column rounded-0" height="100%">
        <v-card-title class="bg-primary text-white text-center">
          Principles
        </v-card-title>
        <v-card-text class="pa-0" style="flex-grow: 1">
          <PrinciplesTable />
        </v-card-text>
      </v-card>
    </v-col>
    <!-- Standards -->
    <v-col class="pt-0" cols="12" lg="6" md="12" sm="12" xl="4" xs="12">
      <v-card class="d-flex flex-column rounded-0" height="100%">
        <v-card-title class="bg-primary text-white text-center">
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
        <v-card-title class="bg-primary text-white text-center">
          Database
        </v-card-title>
        <v-card-text class="pa-0" style="flex-grow: 1">
          <DatabaseTable />
        </v-card-text>
      </v-card>
    </v-col>
    <!-- Policies -->
    <v-col class="pt-0" cols="12" lg="6" md="12" sm="12" xl="4" xs="12">
      <v-card class="d-flex flex-column rounded-0" height="100%">
        <v-card-title class="bg-primary text-white text-center">
          Policies
        </v-card-title>
        <v-card-text class="pa-0" style="flex-grow: 1">
          <PoliciesTable />
        </v-card-text>
      </v-card>
    </v-col>
    <!-- Collections -->
    <v-col class="pt-0" cols="12" lg="6" md="12" sm="12" xl="4" xs="12">
      <v-card class="d-flex flex-column rounded-0" height="100%">
        <v-card-title class="bg-primary text-white text-center">
          Collections
        </v-card-title>
        <v-card-text class="pa-0" style="flex-grow: 1">
          <CollectionsTable />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <!-- Graphs -->
  <v-row>
    <v-col>
      <v-card class="d-flex flex-column rounded-0" height="100%">
        <v-card-title
          v-if="store.getAdvancedSearchResponse.length"
          class="bg-primary text-white text-center"
        >
          Network Graph
        </v-card-title>
        <v-card-text class="pa-0" style="flex-grow: 1">
          <Suspense>
            <GraphView />
          </Suspense>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
<div class="text-center" else>{{ noData }}</div>
</template>
<script>
import {
  BenchmarksTable,
  CollectionsTable,
  DatabaseTable,
  MetricsTable,
  PoliciesTable,
  PrinciplesTable,
  StandardsTable,
} from "@/components/Registry/ResultTables";
import GraphView from "./GraphView";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

export default {
  name: "ResultTableView",
  components: {
    StandardsTable,
    DatabaseTable,
    PoliciesTable,
    CollectionsTable,
    MetricsTable,
    PrinciplesTable,
    BenchmarksTable,
    GraphView
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
