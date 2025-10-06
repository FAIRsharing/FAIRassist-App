<template>
  <div class="mb-6 text-center">
    <v-fade-transition v-if="getLoadingStatus">
      <div>
        <v-overlay
          :absolute="false"
          :model-value="getLoadingStatus"
          class="align-center justify-center"
          opacity="0.8"
        >
          <Loaders />
        </v-overlay>
      </div>
    </v-fade-transition>
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
import { storeToRefs } from "pinia";
import Loaders from "@/components/Loaders/Loaders.vue";
import { generateSelectionQuery } from "@/utils/queryUtil.js";

export default {
  name: "ApplyFilterButton",
  components: { Loaders },
  data: () => {
    return {
      filtersSelected: [],
      isClicked: false,
    };
  },
  setup() {
    const store = useAdvancedSearchStore();
    const {
      getFairassistID,
      getRecordTypeSelected,
      getLoadingStatus,
      getFilterSelected,
      getFairassistName,
    } = storeToRefs(store);
    return {
      store,
      getFairassistID,
      getRecordTypeSelected,
      getLoadingStatus,
      getFilterSelected,
      getFairassistName,
    };
  },
  watch: {
    getFairassistID(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.filtersSelected = [];
        this.store.advancedSearchResponse = [];
      }
    },
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
