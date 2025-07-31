<template>
  <div>
    <v-select
      v-model="fairassistID"
      :items="itemList"
      data-testid="selectGraph"
      item-title="name"
      item-value="id"
      @update:model-value="getGraphData()"
    />
    <div v-if="noData">No data available</div>
    <div v-else ref="chartdiv" class="chartdiv" />
  </div>
</template>
<script>
import axios from "axios";
import d3Graph from "@/utils/d3Graph";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

export default {
  name: "CollapseTreeGraph",
  data: () => {
    return {
      noData: false,
      fairassistID: 1236,
      itemList: [
        {
          id: 1236,
          name: "The FAIR Principles",
        },
        {
          id: 4100,
          name: "FAIR Principles for Research Software",
        },
      ],
    };
  },
  setup() {
    const store = useAdvancedSearchStore();
    return { store };
  },

  mounted() {
    this.getGraphData();
  },
  methods: {
    async getGraphData() {
      this.store.fairassistID = this.fairassistID;
      try {
        const url =
          import.meta.env.VITE_API_ENDPOINT +
          "/search_utils/fairassist_components/" +
          this.fairassistID;
        const getData = await axios.get(url);
        let divSelected = this.$refs.chartdiv;
        d3Graph(divSelected, getData.data);
      } catch (error) {
        if (error) {
          this.noData = true;
        }
      }
    },
  },
};
</script>
