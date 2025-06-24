<template>
  <div>
    <div v-if="noData">No data available</div>
    <div v-else ref="chartdiv" class="chartdiv" />
  </div>
</template>
<script>
import axios from "axios";
import d3Graph from "@/utils/d3Graph";

export default {
  name: "CollapseTreeGraph",
  data: () => {
    return {
      noData: false,
    };
  },
  mounted() {
    this.getGraphData();
  },
  methods: {
    async getGraphData() {
      try {
        const url =
          import.meta.env.VITE_API_ENDPOINT + "/fairassist_components/1236";
        const getData = await axios.get(url);
        const divSelected = this.$refs.chartdiv;
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

<style lang="scss" scoped></style>
