<template>
  <SelectComponent
    :disabled="disabled"
    :item-list="toolsList"
    :item-value="itemValue"
    :label="labelText"
    :tool-tip-text="toolTipText"
    @input="selectedValue"
  />
</template>
<script>
import SelectComponent from "@/components/Registry/UtilComponents/SelectComponent.vue";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import axios from "axios";
import { storeToRefs } from "pinia";

export default {
  name: "MetricsToolFilter",
  components: { SelectComponent },
  setup() {
    const advancedSearchStore = useAdvancedSearchStore();
    const { getRecordTypeSelected } = storeToRefs(advancedSearchStore);
    return { advancedSearchStore, getRecordTypeSelected };
  },
  data: () => {
    return {
      toolsList: [],
      noData: false,
      itemSelected: [],
      itemValue: [],
      toolTipText:
        "Tools applicable to this resource or its data. Multiple selections will be joined with OR. Start typing to see available types.",
      labelText: "Filter Metrics by Tool",
    };
  },
  computed: {
    //Disable this filter if benchmark is selected
    disabled() {
      if (
        this.getRecordTypeSelected.length === 1 &&
        this.getRecordTypeSelected[0] === "benchmark_ids"
      ) {
        return true;
      }
    },
  },
  watch: {
    itemSelected(newValue) {
      if (newValue.length) {
        newValue = newValue.map((e) => e.toLowerCase());
      }
      let toolsType = {
        toolNames: newValue,
      };
      this.advancedSearchStore.toolsSelected = toolsType;
      this.itemValue = newValue;
    },
  },
  mounted() {
    this.getTools();
  },
  methods: {
    selectedValue(item) {
      this.itemSelected = item;
    },

    async getTools() {
      try {
        const url =
          import.meta.env.VITE_API_ENDPOINT +
          "/search_utils/get_metric_tool_names/";
        const getData = await axios.get(url);
        this.toolsList = getData.data;
      } catch (error) {
        if (error) {
          this.noData = true;
        }
      }
    },
  },
};
</script>
