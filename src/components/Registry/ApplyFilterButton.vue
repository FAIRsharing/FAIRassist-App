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
      @click="applyFilter()"
      >Apply Filter
    </v-btn>
  </div>
</template>

<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import { storeToRefs } from "pinia";
import Loaders from "@/components/Loaders/Loaders.vue";
import { jsonToGraphQLQuery } from "json-to-graphql-query";

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
    const { getFairassistID, getRecordTypeSelected, getLoadingStatus } =
      storeToRefs(store);
    return { store, getFairassistID, getRecordTypeSelected, getLoadingStatus };
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
    async applyFilter() {
      let query = jsonToGraphQLQuery({
        query: {
          fairassist_components: {
            fairassist_id: this.getFairassistID,
            record_type: this.getRecordTypeSelected,
          },
        },
      });
      this.store.fetchAdvancedSearchResults();
    },
  },
};
</script>
