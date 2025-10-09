<template>
  <SelectComponent
    v-model="model"
    :disabled="disabled"
    :format="true"
    :item-list="toolsList"
    :item-value="itemValue"
    :label="labelText"
    :tool-tip-text="toolTipText"
    data-testid="selectComponent"
    @input="selectedValue"
  />
</template>
<script>
import axios from "axios";
import SelectComponent from "@/components/Registry/UtilComponents/SelectComponent.vue";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

import { storeToRefs } from "pinia";

export default {
  name: "MetricsToolFilter",
  components: { SelectComponent },
  emits: ["input"],
  setup() {
    const advancedSearchStore = useAdvancedSearchStore();
    const { getRecordTypeSelected, getToolsSelected } =
      storeToRefs(advancedSearchStore);
    return { advancedSearchStore, getRecordTypeSelected, getToolsSelected };
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
    model: {
      get() {
        return this.itemSelected;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
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
      let toolsType = {
        toolNames: newValue,
      };
      this.advancedSearchStore.toolsSelected = toolsType;
      this.itemValue = newValue;
    },
  },
  mounted() {
    this.getTools();
    this.fetchOnLoad();
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

    /**
     * Fetch tools from the store on load
     */
    fetchOnLoad() {
      this.$nextTick(() => {
        let filterArr = this.getToolsSelected;
        if (filterArr.toolNames && filterArr.toolNames.length) {
          this.itemValue = filterArr.toolNames;
        }
      });
    },
  },
};
</script>
