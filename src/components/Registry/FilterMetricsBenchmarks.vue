<template>
  <div class="filterWrapper">
    <!--    <p>{{ filtersSelected }}</p>-->
    <div v-for="filter in filters" :key="filter.id" class="filterCheckbox">
      <v-checkbox
        v-model="filtersSelected"
        :value="filter.label"
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
    <v-btn class="full-width" color="accent2" max-width="200" min-width="200"
      >Apply Filter
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "FilterMetricsBenchmarks",
  data: () => {
    return {
      filtersSelected: [],
      isClicked: false,
      filters: [
        {
          id: 1,
          label: "Filter Metrics by Object type",
        },
        {
          id: 2,
          label: "Filter Metrics and/or Benchmarks by Subject",
        },
        {
          id: 3,
          label: "Filter Metrics by Tool",
        },
        {
          id: 4,
          label: "Filter Metrics and/or Benchmarks by Organisation",
        },
        {
          id: 5,
          label: "Autocomplete one or more metrics based on metric name/abbrev",
        },
      ],
    };
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
