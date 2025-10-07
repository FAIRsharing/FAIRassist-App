<template>
  <SelectComponent
    v-model="model"
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
  emits: ["input"],
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
  computed: {
    model: {
      get() {
        return this.itemSelected;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  watch: {
    itemSelected(newValue) {
      this.advancedSearchStore.recordTypeSelected = newValue;
      this.recordTypeValues(newValue);
    },
  },
  mounted() {
    //Pre-fill selected values from the URL in the component if any
    this.$nextTick(() => {
      if (this.advancedSearchStore.recordTypeSelected.length) {
        this.recordTypeValues(this.advancedSearchStore.recordTypeSelected);
      }
    });
  },

  methods: {
    selectedValue(item) {
      let itemIds = item.map((e) => {
        if (e === "Metrics") return "metric_ids";
        else if (e === "Benchmarks") return "benchmark_ids";
      });
      this.itemSelected = itemIds;
    },

    recordTypeValues(item) {
      let itemNames = item.map((e) => {
        if (e === "metric_ids") return "Metrics";
        else if (e === "benchmark_ids") return "Benchmarks";
      });
      this.itemValue = itemNames;
    },
  },
};
</script>
