<template>
  <div>
    <v-dialog :model-value="showPopup" max-width="400">
      <v-card class="pa-4">
        <v-card-text>
          <div>It will reset all the selection and the results</div>
        </v-card-text>
        <v-card-actions
          :class="{
            'flex-column align-center': $vuetify.display.smAndDown,
          }"
          class="px-6 justify-space-between"
        >
          <v-btn
            :class="{
              'mb-3': $vuetify.display.smAndDown,
            }"
            :width="$vuetify.display.smAndDown ? '100%' : '150'"
            class="text-white bg-green"
            elevation="2"
            fdfdfd
            variant="text"
            @click="resetSelection()"
          >
            OK
          </v-btn>
          <v-btn
            :width="$vuetify.display.smAndDown ? '100%' : '150'"
            class="ml-0 bg-accent3"
            elevation="2"
            variant="text"
            @click="noResetSelection()"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      showPopup: false,
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
    },

    /**
     * Reset the graph data if there is any selection or no data available else get the graph data
     */
    resetPopup() {
      if (this.getAdvancedSearchResponse.length || this.getNoData) {
        this.showPopup = true;
      } else {
        this.getGraphData();
      }
    },

    /**
     * Reset the selection and the results
     */
    resetSelection() {
      this.showPopup = false;
      this.store.resetSelection = true;
      this.store.resetAdvancedSearch();
      this.$router.replace("/registry");
      this.getGraphData();
    },

    /**
     * Do not reset the selection and keep the results
     */
    noResetSelection() {
      this.fairassistID = this.currentId;
      this.showPopup = false;
    },
  },
};
</script>
