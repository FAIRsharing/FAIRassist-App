<template>
  <div class="filterWrapper mb-6">
    <v-fade-transition v-if="store.loadingStatus">
      <div>
        <v-overlay
          :absolute="false"
          :model-value="store.loadingStatus"
          class="align-center justify-center"
          opacity="0.8"
        >
          <Loaders />
        </v-overlay>
      </div>
    </v-fade-transition>
    <div v-for="filter in filters" :key="filter.id" class="filterCheckbox">
      <v-checkbox
        v-model="filtersSelected"
        :value="filter.value"
        class="d-flex"
        data-testid="filtersSelected"
        hide-details
      >
        <template #label>
          <v-card
            class="full-width mb-3 d-flex align-center bg-primary"
            height="100"
            max-width="200"
            min-width="200"
          >
            <v-card-text
              class="white-space-normal text-subtitle-1 text-capitalize"
              >{{ filter.label }}
            </v-card-text>
          </v-card>
        </template>
      </v-checkbox>
    </div>
    <v-btn
      :disabled="!getRecordTypeSelected.length"
      class="full-width"
      color="accent2"
      data-testid="applyFilter"
      max-width="200"
      min-width="200"
      @click="store.fetchAdvancedSearchResults()"
      >Apply Filter
    </v-btn>
  </div>
</template>

<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import Loaders from "@/components/Loaders/Loaders.vue";
import { storeToRefs } from "pinia";

export default {
  name: "FilterMetricsBenchmarks",
  components: { Loaders },
  data: () => {
    return {
      filtersSelected: [],
      isClicked: false,
      filters: [
        {
          id: 1,
          label: "Filter Metrics by Object type",
          value: "metric_ids",
        },
        {
          id: 2,
          label: "Filter Metrics and/or Benchmarks by SubjectFilter",
          value: "benchmark_ids",
        },
        {
          id: 3,
          label: "Filter Metrics by Tool",
          value: "tool_ids",
        },
        {
          id: 4,
          label: "Filter Metrics and/or Benchmarks by Organisation",
          value: "organisation_ids",
        },
        {
          id: 5,
          label: "Autocomplete one or more metrics based on metric name/abbrev",
          value: "name_ids",
        },
      ],
    };
  },
  setup() {
    const store = useAdvancedSearchStore();
    const { getFairassistID, getRecordTypeSelected } = storeToRefs(store);
    return { store, getFairassistID, getRecordTypeSelected };
  },
  watch: {
    getFairassistID(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.filtersSelected = [];
        this.store.advancedSearchResponse = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
:deep {
  .filterCheckbox {
    .v-checkbox {
      .v-selection-control {
        &__wrapper {
          display: none;
        }

        &--dirty {
          .v-label {
            .v-card {
              background-color: #253442 !important;
            }
          }
        }
      }
    }
  }
}
</style>
