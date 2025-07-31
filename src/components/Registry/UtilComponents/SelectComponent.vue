<template>
  <div
    class="d-flex align-center pa-4 mb-4 advancedSearchSelectWrapper rounded"
  >
    <div class="label-text text-white mr-3">{{ label }}</div>
    <v-combobox
      v-model="model"
      :disabled="disabled"
      :items="cleanTextList"
      chips
      class="text-capitalize advancedSearchSelect advancedSearchDialogBoxContent"
      clearable
      closable-chips
      color="primary"
      density="compact"
      flat
      hide-details="auto"
      min-height="36px"
      multiple
      variant="solo"
    >
      <!-- Tooltip for the field -->
      <template #prepend>
        <v-tooltip class="mr-2" location="bottom">
          <template #activator="{ props }">
            <v-icon
              class="mr-n3 iconStyle opacity-100 text-white"
              size="x-small"
              v-bind="props"
            >
              fas fa-question-circle
            </v-icon>
          </template>
          <span> {{ toolTipText }} </span>
        </v-tooltip>
      </template>
    </v-combobox>
  </div>
</template>
<script>
import { capitalize } from "lodash";
import stringUtils from "@/utils/stringUtils.js";

export default {
  name: "SelectComponent",
  mixins: [stringUtils],
  data: () => {
    return {
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
  emits: ["input"],
  computed: {
    cleanTextList() {
      return this.itemList.map((item) => capitalize(this.cleanString(item)));
    },
  },
  watch: {
    model(newValue) {
      this.$emit("input", newValue);
    },
  },
  methods: {
    capitalize,
  },
};
</script>
