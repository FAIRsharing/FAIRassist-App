<template>
  <SelectComponent
    :item-list="itemList"
    :item-value="itemValue"
    :label="labelText"
    :tool-tip-text="toolTipText"
    class="selectRecordType"
    @input="selectedValue"
  />
</template>
<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import SelectComponent from "@/components/Registry/UtilComponents/SelectComponent.vue";

export default {
  name: "SelectRecordType",
  components: { SelectComponent },
  data: () => {
    return {
      itemSelected: [],
      itemValue: [],
      toolTipText: "Select record type",
      labelText: "Select record type",
      itemList: ["Metrics", "Benchmarks"],
    };
  },
  setup() {
    const advancedSearchStore = useAdvancedSearchStore();
    return { advancedSearchStore };
  },
  watch: {
    itemSelected(newValue) {
      this.advancedSearchStore.recordTypeSelected = newValue;
    },
  },

  methods: {
    selectedValue(item) {
      let itemIds = item.map((e) => {
        if (e === "Metrics") return "metric_ids";
        else if (e === "Benchmarks") return "benchmark_ids";
      });
      this.itemSelected = itemIds;
    },
  },
};
</script>
