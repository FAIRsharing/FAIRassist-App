<template>
  <div class="mb-6 text-center">
    <v-btn
      :disabled="!getRecordTypeSelected.length"
      class="full-width"
      color="accent"
      data-testid="applyFilter"
      max-width="200"
      min-width="200"
      @click="fetchResults()"
      >Apply Filter
    </v-btn>
  </div>
</template>

<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import { generateSelectionQuery } from "@/utils/queryUtil.js";
import { storeToRefs } from "pinia";

export default {
  name: "ApplyFilterButton",
  data: () => {
    return {
      isClicked: false,
    };
  },
  setup() {
    const store = useAdvancedSearchStore();
    const { getRecordTypeSelected, getFilterSelected, getFairassistName } =
      storeToRefs(store);
    return {
      store,
      getRecordTypeSelected,
      getFilterSelected,
      getFairassistName,
    };
  },

  methods: {
    async fetchResults() {
      await this.store.fetchAdvancedSearchResults();
      this.$router.push({
        query: {
          search: generateSelectionQuery(
            this.getFairassistName,
            this.getFilterSelected,
          ),
        },
      });
    },
  },
};
</script>
