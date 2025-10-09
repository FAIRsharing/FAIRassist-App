<template>
  <SelectComponent
    v-model="model"
    :item-list="itemList"
    :item-value="itemValue"
    :label="labelText"
    :tool-tip-text="toolTipText"
    class="selectRecordType"
    data-testid="selectComponent"
    @input="selectedValue"
  />
</template>
<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import SelectComponent from "@/components/Registry/UtilComponents/SelectComponent.vue";
import { storeToRefs } from "pinia";

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
    const { getRecordTypeSelected } = storeToRefs(advancedSearchStore);
    return { advancedSearchStore, getRecordTypeSelected };
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
    this.fetchOnLoad();
  },

  methods: {
    selectedValue(item) {
      let itemIds = item.map((e) => {
        if (e === "Metrics") return "metric_ids";
        else if (e === "Benchmarks") return "benchmark_ids";
      });
      this.itemSelected = itemIds;
    },

    /**
     * Format record type names to show in the selection chips
     * @param item
     */
    recordTypeValues(item) {
      let itemNames = item.map((e) => {
        if (e === "metric_ids") return "Metrics";
        else if (e === "benchmark_ids") return "Benchmarks";
      });
      this.itemValue = itemNames;
    },

    /**
     * Fetch record types from the store on load
     */
    fetchOnLoad() {
      this.$nextTick(() => {
        let filterArr = this.getRecordTypeSelected;
        if (filterArr && filterArr.length) {
          this.recordTypeValues(filterArr);
        }
      });
    },
  },
};
</script>
