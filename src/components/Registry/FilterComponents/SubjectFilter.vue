<template>
  <SelectComponent
    v-model="model"
    :item-list="subjectsList"
    :item-value="itemValue"
    :label="labelText"
    :tool-tip-text="toolTipText"
    data-testid="selectComponent"
    @input="selectedValue"
  />
</template>
<script>
import axios from "axios";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import SelectComponent from "@/components/Registry/UtilComponents/SelectComponent.vue";
import { storeToRefs } from "pinia";

export default {
  name: "SubjectFilter",
  components: { SelectComponent },
  emits: ["input"],
  setup() {
    const advancedSearchStore = useAdvancedSearchStore();
    const { getSubjectSelected } = storeToRefs(advancedSearchStore);
    return { advancedSearchStore, getSubjectSelected };
  },
  data: () => {
    return {
      subjectsList: [],
      noData: false,
      itemSelected: [],
      itemValue: [],
      toolTipText:
        "Tags from the FAIRsharing subject ontology. Multiple selections will be joined with OR. Start typing to see SubjectFilter tags.",
      labelText: "Filter Metrics and/or Benchmarks by SubjectFilter",
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

  mounted() {
    this.getSubjects();
    this.fetchOnLoad();
  },

  methods: {
    selectedValue(item) {
      this.itemSelected = item;
    },

    async getSubjects() {
      try {
        const url =
          import.meta.env.VITE_API_ENDPOINT +
          "/search_utils/get_fairassist_field/subjects";
        const getData = await axios.get(url);
        this.subjectsList = getData.data;
      } catch (error) {
        if (error) {
          this.noData = true;
        }
      }
    },

    /**
     * Fetch subjects from the store on load
     */
    fetchOnLoad() {
      this.$nextTick(() => {
        let filterArr = this.getSubjectSelected;
        if (filterArr.subjects && filterArr.subjects.length) {
          this.itemValue = filterArr.subjects;
        }
      });
    },
  },
};
</script>
