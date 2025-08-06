<template>
  <div
    :class="{ advancedSearchSelectMobile: $vuetify.display.mdAndDown }"
    class="d-flex align-center pa-4 mb-4 advancedSearchSelectWrapper rounded flex-column flex-md-row"
  >
    <div class="d-flex">
      <!-- Tooltip -->
      <v-tooltip class="mr-2" location="bottom">
        <template #activator="{ props }">
          <v-icon
            class="mr-3 iconStyle opacity-100 text-white"
            size="x-small"
            v-bind="props"
          >
            fas fa-question-circle
          </v-icon>
        </template>
        <span> {{ toolTipText }} </span>
      </v-tooltip>
      <!-- Label -->
      <div
        :class="{
          'mb-2 mr-0 text-center': $vuetify.display.smAndDown,
        }"
        class="label-text text-white mr-3 full-width"
      >
        {{ label }}
      </div>
    </div>
    <!-- Autocomplete -->
    <v-autocomplete
      v-model="model"
      v-model:search="search"
      :disabled="disabled"
      :items="itemList"
      :loading="loading"
      chips
      class="text-capitalize advancedSearchSelect"
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
