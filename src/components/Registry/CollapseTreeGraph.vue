<template>
  <div>
    <WarningDailog
      :show-dialog="showDialog"
      @noReset="noResetSelection"
      @yesReset="yesResetSelection"
    />
    <v-select
      v-model="fairassistID"
      :items="itemList"
      data-testid="selectGraph"
      item-title="name"
      item-value="id"
      @update:model-value="resetPopup()"
    >
    </v-select>
    <div v-if="noData">No data available</div>
    <div v-else ref="chartdiv" class="chartdiv" />
  </div>
</template>
<script>
import axios from "axios";
import d3Graph from "@/utils/d3Graph";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";
import { storeToRefs } from "pinia";
import WarningDialog from "@/components/Registry/WarningDialog.vue";

export default {
  name: "CollapseTreeGraph",
  components: { WarningDailog: WarningDialog },
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
      showDialog: false,
      currentId: Number,
    };
  },
  setup() {
    const store = useAdvancedSearchStore();
    const { getAdvancedSearchResponse, getNoData } = storeToRefs(store);
    return {
      store,
      getAdvancedSearchResponse,
      getNoData,
    };
  },

  watch: {
    fairassistID(oldValue, newValue) {
      if (newValue !== oldValue) {
        this.currentId = newValue;
      }
    },
  },

  mounted() {
    this.getGraphData();
  },
  methods: {
    /**
     * Get the graph data from the API
     */
    async getGraphData() {
      this.store.fairassistID = this.fairassistID;
      try {
        const url =
          import.meta.env.VITE_API_ENDPOINT +
          "/search_utils/fairassist_components/" +
          this.fairassistID;
        const getData = await axios.get(url);
        this.store.fairAssistName = getData.data.name;
        let divSelected = this.$refs.chartdiv;
        d3Graph(divSelected, getData.data);
      } catch (error) {
        if (error) {
          this.noData = true;
        }
      }
      this.store.resetSelection = false;
    },

    /**
     * Reset the graph data if there is any selection or no data available else get the graph data
     */
    resetPopup() {
      if (this.getAdvancedSearchResponse.length || this.getNoData) {
        this.showDialog = true;
      } else {
        this.getGraphData();
      }
    },

    /**
     * On Reset of the selection call graph and hide the dialog
     * @param value
     */
    yesResetSelection(value) {
      if (value) {
        this.getGraphData();
        this.showDialog = false;
      }
    },

    /**
     * On Cancel of the selection hide the dialog and keep the current graph data
     * @param value
     */
    noResetSelection(value) {
      if (value) {
        this.fairassistID = this.currentId;
        this.showDialog = false;
      }
    },
  },
};
</script>
