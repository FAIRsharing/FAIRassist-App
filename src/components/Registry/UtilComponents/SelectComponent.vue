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
    <!-- Select -->
    <v-autocomplete
      v-model="model"
      :disabled="disabled"
      :items="cleanTextList"
      chips
      class="text-capitalize advancedSearchSelect"
      clear-on-select
      clearable
      closable-chips
      color="primary"
      data-testid="comboboxComponent"
      density="compact"
      flat
      hide-details="auto"
      min-height="36px"
      multiple
      variant="solo"
    />
  </div>
</template>
<script>
import { capitalize } from "lodash";
import stringUtils from "@/utils/stringUtils.js";

export default {
  name: "SelectComponent",
  mixins: [stringUtils],
  props: {
    itemList: {
      type: Array,
      default: () => [],
    },
    itemValue: {
      type: Array,
      default: () => [],
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
    format: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["input"],
  computed: {
    model: {
      get() {
        return this.itemValue;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    cleanTextList() {
      return this.itemList.map((item) => {
        if (this.format) {
          return item;
        } else {
          return capitalize(this.cleanString(item));
        }
      });
    },
  },
  watch: {
    disabled(newValue) {
      if (newValue) {
        this.model = [];
      }
    },
    // model(newValue) {
    //   this.$emit("input", newValue);
    // },
  },
  methods: {
    capitalize,
  },
};
</script>
