<template>
  <SelectComponent
    :item-list="organisationsList"
    :item-value="itemValue"
    :label="labelText"
    :tool-tip-text="toolTipText"
    @input="selectedValue"
  />
</template>
<script>
import axios from "axios";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import SelectComponent from "@/components/Registry/UtilComponents/SelectComponent.vue";

export default {
  name: "OrganisationsFilter",
  components: { SelectComponent },
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
      organisationsList: [],
      noData: false,
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

  mounted() {
    this.getOrganisations();
  },

  methods: {
    selectedValue(item) {
      this.itemSelected = item;
    },
    async getOrganisations() {
      try {
        const url =
          import.meta.env.VITE_API_ENDPOINT +
          "/search_utils/get_fairassist_field/organisations";
        const getData = await axios.get(url);
        this.organisationsList = getData.data;
      } catch (error) {
        if (error) {
          this.noData = true;
        }
      }
    },
  },
};
</script>
