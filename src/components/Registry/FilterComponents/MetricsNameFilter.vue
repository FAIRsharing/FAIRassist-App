<template>
  <AutoCompleteComponent
    :disabled="true"
    :item-list="[]"
    :item-value="itemValue"
    :label="labelText"
    :loading="false"
    :tool-tip-text="toolTipText"
    @input="selectedValue"
    @fetch-data="getResults"
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

  watch: {
    itemSelected(newValue) {
      if (newValue.length) {
        newValue = newValue.map((e) => e.toLowerCase());
      }
      let subjectSelected = {
        subjects: newValue,
      };
      this.advancedSearchStore.subjectSelected = subjectSelected;
      this.itemValue = newValue;
    },
  },

  methods: {
    selectedValue(item) {
      this.itemSelected = item;
    },
    getResults(queryParams) {
      if (queryParams) this.store.fetchSearchSubjects(queryParams);
    },
    // async getMetrics() {
    //   try {
    //     const url =
    //       import.meta.env.VITE_API_ENDPOINT +
    //       "/search_utils/get_metric_tool_names/";
    //     const getData = await axios.get(url);
    //     this.toolsList = getData.data;
    //   } catch (error) {
    //     if (error) {
    //       this.noData = true;
    //     }
    //   }
    // },
  },
};
</script>
