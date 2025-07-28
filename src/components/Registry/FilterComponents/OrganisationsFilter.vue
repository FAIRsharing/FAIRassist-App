<template>
  <AutoCompleteComponent
    :item-list="getSearchOrganisations"
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
import { useOrganisationSearchStore } from "@/stores/organisationSearch.js";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import { storeToRefs } from "pinia";

export default {
  name: "OrganisationsFilter",
  components: { AutoCompleteComponent },
  setup() {
    const store = useOrganisationSearchStore();
    const advancedSearchStore = useAdvancedSearchStore();
    const { getSearchOrganisations, getLoadingStatus } = storeToRefs(store);
    return {
      store,
      getSearchOrganisations,
      getLoadingStatus,
      advancedSearchStore,
    };
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
        "Organisations related to this record. Multiple selections will be joined with OR. Start typing to see Organisations.",
      labelText: "Filter Metrics and/or Benchmarks by Organisation",
    };
  },

  watch: {
    itemSelected(newValue) {
      if (newValue.length) {
        newValue = newValue.map((e) => e.toLowerCase());
      }
      let organisationSelected = {
        organisations: newValue,
      };
      this.advancedSearchStore.organisationSelected = organisationSelected;
      this.itemValue = newValue;
    },
  },

  methods: {
    selectedValue(item) {
      this.itemSelected = item;
    },
    getResults(queryParams) {
      if (queryParams) this.store.fetchSearchOrganisations(queryParams);
    },
  },
};
</script>
