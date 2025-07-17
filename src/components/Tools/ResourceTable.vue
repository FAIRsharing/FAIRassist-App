<template>
  <div>
    <v-fade-transition v-if="loading">
      <div>
        <v-overlay
          :absolute="false"
          :model-value="loading"
          class="align-center justify-center"
          opacity="0.8"
        >
          <Loaders />
        </v-overlay>
      </div>
    </v-fade-transition>
    <v-data-table
      :headers="headers"
      :items="resources"
      :no-data-text="noData"
      item-value="resource"
      mobile-breakpoint="sm"
    >
      <template #item.resource="{ item }">
        <a :href="item.resourceURL" rel="noopener noreferrer" target="_blank">
          {{ item.resource }}
        </a>
      </template>
      <template #item.keyFeatures="{ item }">
        <ul class="text-left">
          <li v-for="feature in item.keyFeatures">
            {{ feature }}
          </li>
        </ul>
      </template>

      <template #item.readingMaterial="{ item }">
        <a
          :href="item.readingMaterialURL"
          rel="noopener noreferrer"
          target="_blank"
        >
          {{ item.readingMaterial }}
        </a>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import axios from "axios";
import Loaders from "@/components/Loaders/Loaders.vue";

export default {
  name: "ResourceTable",
  components: { Loaders },
  data() {
    return {
      headers: [
        {
          title: "Resource",
          value: "resource",
          align: "center",
          key: "resource",
        },
        {
          title: "Execution type",
          value: "executionType",
          align: "center",
          key: "executionType",
        },
        {
          title: "Key features",
          value: "keyFeatures",
          align: "center",
        },
        {
          title: "Organisation",
          value: "organisation",
          align: "center",
          key: "organisation",
        },
        {
          title: "Target objects",
          value: "targetObjects",
          align: "center",
          key: "targetObjects",
        },
        {
          title: "Reading material",
          value: "readingMaterial",
          align: "center",
          key: "readingMaterial",
        },
      ],
      resources: [],
      noData: "",
      loading: false,
    };
  },

  mounted() {
    this.getResourceData();
  },
  methods: {
    /**
     *  Accessing the spreadsheet
     * */
    async getResourceData() {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY,
        sheetID = import.meta.env.VITE_GOOGLE_SHEET_ID,
        sheetName = "FormResponses",
        baseURL = "https://sheets.googleapis.com/v4/spreadsheets/",
        url =
          baseURL +
          sheetID +
          "/values/" +
          sheetName +
          "?alt=json&key=" +
          apiKey;
      try {
        this.loading = true;
        const getData = await axios.get(url);
        this.plotTable(getData);
      } catch (error) {
        if (error) {
          this.noData = "No data found";
        }
      }
      this.loading = false;
    },

    /**
     * Plot data into the table
     * @param {Object} data - response from the Google spreadsheet
     */
    plotTable(data) {
      const tableData = data.data["values"];
      tableData.forEach((obj) => {
        if (["Y", "True", "Yes", "y", "true", "yes"].includes(obj[13])) {
          this.resources.push({
            resource: obj[1],
            resourceURL: obj[2],
            executionType: obj[3],
            keyFeatures: obj[4].split("\n"),
            organisation: obj[5],
            targetObjects: obj[7],
            readingMaterial: obj[8],
            readingMaterialURL: obj[9],
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
:deep {
  table {
    thead tr th {
      background-color: #8dbdd8;
      border-right: 1px solid white;
      font-size: 1.3em;
      color: white;
      line-height: 1.2em;

      &:last-child {
        border-right: none;
      }
    }

    tbody tr {
      &:nth-child(odd) {
        background-color: rgba(0, 0, 0, 0.05);
      }

      td {
        padding: 16px !important;
        border-right: 1px solid white;

        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>
