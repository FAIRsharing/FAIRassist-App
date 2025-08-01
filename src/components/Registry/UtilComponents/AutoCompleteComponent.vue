<template>
  <div
    class="d-flex align-center pa-4 mb-4 advancedSearchSelectWrapper rounded"
  >
    <div class="label-text text-white mr-3">{{ label }}</div>
    <v-autocomplete
      v-model="model"
      v-model:search="search"
      :disabled="disabled"
      :items="itemList"
      :loading="loading"
      chips
      class="text-capitalize advancedSearchAutocomplete advancedSearchDialogBoxContent"
      clear-on-select
      clearable
      closable-chips
      color="primary"
      density="compact"
      flat
      hide-details="auto"
      hide-no-data
      min-height="36px"
      multiple
      variant="solo"
    >
      <!-- Tooltip for the field -->
      <template #prepend>
        <v-tooltip class="mr-2" location="bottom">
          <template #activator="{ props }">
            <v-icon
              class="mr-n3 iconStyle text-white opacity-100"
              size="x-small"
              v-bind="props"
            >
              fas fa-question-circle
            </v-icon>
          </template>
          <span> {{ toolTipText }} </span>
        </v-tooltip>
      </template>
    </v-autocomplete>
  </div>
</template>
<script>
export default {
  name: "AutoCompleteComponent",
  data: () => {
    return {
      search: null,
      model: [],
    };
  },
  props: {
    itemList: {
      type: Array,
      default: () => [],
    },
    itemValue: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    toolTipText: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["input", "fetchData"],
  watch: {
    search(val) {
      if (!val || val.length < 3) return;
      val = val.trim();
      this.$emit("fetchData", val);
    },
    model(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>
