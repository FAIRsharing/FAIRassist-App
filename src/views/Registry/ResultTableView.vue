<template>
  <v-row v-if="getAdvancedSearchResponse.length">
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
  StandardsTable
} from "@/components/Registry/ResultTables";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import { storeToRefs } from "pinia";

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
  },
  setup() {
    const advancedSearchStore = useAdvancedSearchStore();
    const { getAdvancedSearchResponse } = storeToRefs(advancedSearchStore);
    return { advancedSearchStore, getAdvancedSearchResponse };
  },
  computed: {
    noData() {
      if (this.advancedSearchStore.getNoData) {
        return "No data available";
      }
    },
  },

  async mounted() {
    await this.fetchQueryParams();
  },
  methods: {
    async fetchQueryParams() {
      // Checking if advancedsearch has query parameters
      if (Object.values(this.$route.query).length) {
        const routeQuery = this.$route.query;
        //Query format is same as fetchAdvancedSearchResults action
        let whereObjData = {
          operator: "_and",
          fields: [],
        };

        //Destructuring the fields string into valid advancedsearch format to execute the query
        const searchFieldsArr = routeQuery["search"]
          .split(/^\((.*)\)$/) //removes only first and last parenthesis
          .filter((item) => item); //Filter is used to remove empty string

        const searchItemsArr = searchFieldsArr[0].split("&");
        searchItemsArr.forEach((subItem) => {
          const paramValues = subItem.split("=");
          //For fairassist id
          if (paramValues[0] === "principle") {
            if (paramValues[1] === "FAIR Principles for Research Software") {
              this.advancedSearchStore.fairassistID = 4100;
            } else if (paramValues[1] === "The FAIR Principles") {
              this.advancedSearchStore.fairassistID = 1236;
            }
          }
          //For record type the response is an array as it is a multiple values select dropdown
          else if (paramValues[0] === "recordType") {
            this.advancedSearchStore.recordTypeSelected = [paramValues[1]];
          }
          //For objectTypes
          else if (paramValues[0] === "objectTypes") {
            this.advancedSearchStore.objectTypeSelected = {
              objectTypes: paramValues[1].split("OR"),
            };
          }
          //For subjects
          else if (paramValues[0] === "subjects") {
            this.advancedSearchStore.subjectSelected = {
              subjects: paramValues[1].split("OR"),
            };
          }
          //For organisations
          else if (paramValues[0] === "organisations") {
            this.advancedSearchStore.organisationSelected = {
              organisations: paramValues[1].split("OR"),
            };
          }
          //For toolNames
          else if (paramValues[0] === "toolNames") {
            this.advancedSearchStore.toolsSelected = {
              toolNames: paramValues[1].split("OR"),
            };
          }
        });
        await this.advancedSearchStore.fetchAdvancedSearchResults();
      }
    },
  },
};
</script>
