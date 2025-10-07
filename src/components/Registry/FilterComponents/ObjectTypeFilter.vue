<template>
  <SelectComponent
    v-model="model"
    :disabled="disabled"
    :item-list="getObjectTypes"
    :item-value="itemValue"
    :label="labelText"
    :tool-tip-text="toolTipText"
    @input="selectedValue"
  />
</template>
<script>
import SelectComponent from "@/components/Registry/UtilComponents/SelectComponent.vue";
import { useObjectTypesStore } from "@/stores/objectTypes.js";
import { storeToRefs } from "pinia";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

export default {
  name: "ObjectTypeFilter",
  components: { SelectComponent },
  emits: ["input"],
  setup() {
    const store = useObjectTypesStore();
    const advancedSearchStore = useAdvancedSearchStore();
    const { getObjectTypes, getLoadingStatus } = storeToRefs(store);
    const { getRecordTypeSelected } = storeToRefs(advancedSearchStore);
    return {
      store,
      getObjectTypes,
      getLoadingStatus,
      advancedSearchStore,
      getRecordTypeSelected,
    };
  },
  data: () => {
    return {
      itemSelected: [],
      itemValue: [],
      toolTipText:
        "Object types applicable to this resource or its data. Multiple selections will be joined with OR. Start typing to see available types.",
      labelText: "Filter Metrics by Object type",
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
      if (newValue.length) {
        newValue = newValue.map((e) => e.toLowerCase());
      }
      let objectType = {
        objectTypes: newValue,
      };
      this.advancedSearchStore.objectTypeSelected = objectType;

      this.itemValue = newValue;
    },
  },
  mounted() {
    this.store.fetchObjectTypes();

    //Pre-fill selected values from the URL in the component if any
    this.$nextTick(() => {
      let filterArr = this.advancedSearchStore.objectTypeSelected["objectType"];
      if (filterArr && filterArr.length) {
        this.itemValue =
          this.advancedSearchStore.objectTypeSelected["objectType"];
      }
    });
  },
  methods: {
    selectedValue(item) {
      this.itemSelected = item;
    },
  },
};
</script>
