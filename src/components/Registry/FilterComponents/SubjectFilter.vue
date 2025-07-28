<template>
  <AutoCompleteComponent
    :item-list="getSearchSubjects"
    :item-value="itemValue"
    :label="labelText"
    :loading="getLoadingStatus"
    :tool-tip-text="toolTipText"
    @input="selectedValue"
    @fetch-data="getResults"
  />
</template>
<script>
import AutoCompleteComponent from "../UtilComponents/AutoCompleteComponent.vue";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import { storeToRefs } from "pinia";
import { useSubjectSearchStore } from "@/stores/subjectSearch.js";

export default {
  name: "SubjectFilter",
  components: { AutoCompleteComponent },
  setup() {
    const store = useSubjectSearchStore();
    const advancedSearchStore = useAdvancedSearchStore();
    const { getSearchSubjects, getLoadingStatus } = storeToRefs(store);
    return { store, getSearchSubjects, getLoadingStatus, advancedSearchStore };
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["input"],
  data: () => {
    return {
      itemSelected: [],
      itemValue: [],
      toolTipText:
        "Tags from the FAIRsharing subject ontology. Multiple selections will be joined with OR. Start typing to see SubjectFilter tags.",
      labelText: "Filter Metrics and/or Benchmarks by SubjectFilter",
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
  },
};
</script>
