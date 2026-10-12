<template>
  <v-banner
    v-if="userSelection && userSelection.length"
    bg-color="#f5f5f5"
    border
    class="mt-10"
    rounded
    sticky
  >
    <div>
      <h3 class="d-inline">Search Results For :&nbsp;</h3>
      <v-chip
        v-for="selection in userSelection"
        :keys="selection"
        :text="formatString(selection)"
        class="ma-1 text-capitalize"
        color="primary"
        variant="elevated"
      />
    </div>
  </v-banner>
</template>
<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

import { storeToRefs } from "pinia";
import stringUtils from "@/utils/stringUtils.js";
import { capitalize } from "lodash";

export default {
  name: "Breadcrumbs",
  mixins: [stringUtils],
  setup() {
    const advancedSearchStore = useAdvancedSearchStore();
    const { getFilterSelected } = storeToRefs(advancedSearchStore);
    return {
      advancedSearchStore,
      getFilterSelected,
    };
  },

  computed: {
    userSelection() {
      let selectionArr = [];
      this.getFilterSelected.forEach((item) => {
        if (Object.values(item) && Object.values(item).length) {
          selectionArr.push(Object.values(item));
        }
      });
      return selectionArr.flat(2);
    },
  },
  methods: {
    /**
     * Format record type names to show in the selection chips
     * @param item
     * @return {string}
     */
    formatString(item) {
      if (item === "metric_ids") return "Metrics";
      else if (item === "benchmark_ids") return "Benchmarks";
      else {
        return capitalize(this.cleanString(item));
      }
    },
  },
};
</script>
