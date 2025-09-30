<template>
  <v-banner
    v-if="getRecordTypeSelected && getRecordTypeSelected.length"
    bg-color="#f5f5f5"
    border
    class="mt-10"
    rounded
    sticky
  >
    <h3 class="d-inline">Search Results For :&nbsp;</h3>
    <v-chip
      v-for="selection in getRecordTypeSelected"
      :keys="selection"
      :text="recordType(selection)"
      class="ma-1"
      color="primary"
      variant="elevated"
    />
    <v-chip
      v-for="selection in getObjectTypeSelected"
      :keys="selection"
      :text="capitalize(this.cleanString(selection))"
      class="ma-1"
      color="primary"
      variant="elevated"
    />
    <v-chip
      v-for="selection in getToolsSelected"
      :keys="selection"
      :text="capitalize(this.cleanString(selection))"
      class="ma-1"
      color="primary"
      variant="elevated"
    />
    <v-chip
      v-for="selection in getSubjectSelected"
      :keys="selection"
      :text="capitalize(this.cleanString(selection))"
      class="ma-1"
      color="primary"
      variant="elevated"
    />
    <v-chip
      v-for="selection in getOrganisationSelected"
      :keys="selection"
      :text="capitalize(this.cleanString(selection))"
      class="ma-1"
      color="primary"
      variant="elevated"
    />
  </v-banner>
</template>
<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

import { storeToRefs } from "pinia";
import { capitalize } from "lodash";
import stringUtils from "@/utils/stringUtils.js";

export default {
  name: "Breadcrumbs",
  mixins: [stringUtils],
  setup() {
    const advancedSearchStore = useAdvancedSearchStore();
    const {
      getRecordTypeSelected,
      getObjectTypeSelected,
      getSubjectSelected,
      getToolsSelected,
      getOrganisationSelected,
    } = storeToRefs(advancedSearchStore);
    return {
      advancedSearchStore,
      getRecordTypeSelected,
      getObjectTypeSelected,
      getSubjectSelected,
      getToolsSelected,
      getOrganisationSelected,
    };
  },
  methods: {
    capitalize,

    /**
     * Format record type names to show in the selection chips
     * @param item
     * @return {string}
     */
    recordType(item) {
      if (item === "metric_ids") return "Metrics";
      else if (item === "benchmark_ids") return "Benchmarks";
    },
  },
};
</script>
