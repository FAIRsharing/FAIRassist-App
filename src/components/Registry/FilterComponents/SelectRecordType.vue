<template>
  <div
    class="d-flex align-center pa-4 mb-4 advancedSearchSelectWrapper rounded"
  >
    <div class="label-text text-white mr-3">Select Record Type</div>
    <v-select
      v-model="recordTypeSelected"
      :items="itemList"
      chips
      class="text-capitalize advancedSearchSelect advancedSearchDialogBoxContent"
      clearable
      closable-chips
      color="primary"
      data-testid="selectGraph"
      density="compact"
      flat
      hide-details="auto"
      item-title="name"
      item-value="value"
      min-height="36px"
      multiple
      variant="solo"
    >
      <!-- Tooltip for the field -->
      <template #prepend>
        <v-tooltip class="mr-2" location="bottom">
          <template #activator="{ props }">
            <v-icon
              class="mr-1 iconStyle opacity-100 text-white"
              size="x-small"
              v-bind="props"
            >
              fas fa-question-circle
            </v-icon>
          </template>
          <span> {{ toolTipText }} </span>
        </v-tooltip>
      </template>
    </v-select>
  </div>
</template>
<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

export default {
  name: "SelectRecordType",
  data: () => {
    return {
      recordTypeSelected: [],
      toolTipText: "Select the record type",
      itemList: [
        {
          id: 1,
          name: "Metrics",
          value: "metric_ids",
        },
        {
          id: 2,
          name: "Benchmarks",
          value: "benchmark_ids",
        },
      ],
    };
  },
  setup() {
    const store = useAdvancedSearchStore();
    return { store };
  },
  watch: {
    recordTypeSelected(newValue) {
      this.store.recordTypeSelected = newValue;
    },
  },
};
</script>
