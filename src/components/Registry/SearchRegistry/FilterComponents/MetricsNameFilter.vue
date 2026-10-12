<template>
  <AutoCompleteComponent
    :disabled="true"
    :item-list="[]"
    :item-value="itemValue"
    :label="labelText"
    :loading="false"
    :tool-tip-text="toolTipText"
  />
</template>
<script>
import AutoCompleteComponent from "../UtilComponents/AutoCompleteComponent.vue";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

export default {
  name: "MetricsNameFilter",
  components: { AutoCompleteComponent },
  setup() {
    const advancedSearchStore = useAdvancedSearchStore();
    return { advancedSearchStore };
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data: () => {
    return {
      itemSelected: [],
      itemValue: [],
      toolTipText:
        "Tags from the FAIRsharing subject ontology. Multiple selections will be joined with OR. Start typing to see SubjectFilter tags.",
      labelText: "Autocomplete one or more metrics based on metric name/abbrev",
    };
  },
};
</script>
