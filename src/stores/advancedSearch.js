import { defineStore } from "pinia";
import GraphClient from "@/lib/GraphClient/GraphClient.js";
import advancedQuery from "@/lib/GraphClient/queries/getAdvancedSearch.json";
import fairassistComponentDetails from "@/utils/fairassistComponentDetails.js";
import { isEmpty } from "lodash";

const CLIENT = new GraphClient(),
  ADVANCED_TAGS = JSON.parse(JSON.stringify(advancedQuery));

export const useAdvancedSearchStore = defineStore("advancedSearch", {
  state: () => ({
    fairassistID: null,
    advancedSearch: {},
    advancedSearchResponse: [],
    loadingStatus: false,
    errorStatus: false,
    noData: false,
    recordTypeSelected: [],
    objectTypeSelected: {},
    subjectSelected: {},
    organisationSelected: {},
    toolsSelected: {},
  }),
  actions: {
    async fetchAdvancedSearchResults() {
      this.loadingStatus = true;
      let searchIds = await fairassistComponentDetails(
        this.fairassistID,
        this.recordTypeSelected,
      );
      let whereObjData = {
        operator: "_and",
        fields: [],
      };

      let filtersArr = [];
      filtersArr.push(
        this.objectTypeSelected,
        this.subjectSelected,
        this.organisationSelected,
        this.toolsSelected,
      );
      filtersArr.forEach((item) => {
        //Add filters if they have value
        if (!isEmpty(item)) {
          whereObjData.fields.push(item);
          //Remove the added filters if they don't have any value
          if (isEmpty(Object.values(item)[0])) {
            whereObjData.fields.splice(whereObjData.fields.indexOf(item), 1);
          }
        }
      });

      //Below is the format required for GraphQl query
      let whereObjDataGraphQl = JSON.stringify(whereObjData).replace(
        /"([^"]+)":/g,
        "$1:",
      );

      ADVANCED_TAGS.queryParam = {
        id: searchIds,
        where: whereObjDataGraphQl,
      };
      try {
        let response = await CLIENT.executeQuery(ADVANCED_TAGS);
        if (!response["error"]) {
          if (!response["advancedSearch"].length) {
            this.noData = true;
            this.advancedSearchResponse = [];
          } else {
            this.noData = false;
            this.errorStatus = false;
            // this.advancedSearchResponse = response["advancedSearch"];
            this.advancedSearchResponse = response["advancedSearch"].map(
              ({ name, type, id, registry, status }) => ({
                name,
                type,
                id,
                registry,
                status,
              }),
            );

            let fairassistRelations = response["advancedSearch"].map(
              ({ fairassistRelations }) => fairassistRelations,
            );
            fairassistRelations = fairassistRelations.flat(1);
            //For metrics as fairassistRelations is empty for benchmarks
            if (fairassistRelations.length) {
              fairassistRelations = fairassistRelations.map(
                ({ name, type, id, registry, status }) => ({
                  name,
                  type,
                  id,
                  registry,
                  status,
                }),
              );
            }
            this.advancedSearchResponse =
              this.advancedSearchResponse.concat(fairassistRelations);
          }
        } else {
          this.errorStatus = true;
        }
      } catch (error) {
        this.errorStatus = true;
      }
      this.loadingStatus = false;
    },
  },

  getters: {
    getAdvancedSearchResponse(state) {
      return state.advancedSearchResponse;
    },
    getLoadingStatus(state) {
      return state.loadingStatus;
    },
    getErrorStatus(state) {
      return state.errorStatus;
    },
    getNoData(state) {
      return state.noData;
    },
    getFairassistID(state) {
      return state.fairassistID;
    },
    getRecordTypeSelected(state) {
      return state.recordTypeSelected;
    },
    getStandardsData(state) {
      let standardsArr = state.advancedSearchResponse.filter((item) => {
        return (
          item.registry === "Standard" &&
          item.type !== "principle" &&
          item.type !== "metrics" &&
          item.type !== "benchmark"
        );
      });
      return standardsArr;
    },
    getDatabaseData(state) {
      let databaseArr = state.advancedSearchResponse.filter((item) => {
        return item.registry === "Database";
      });
      return databaseArr;
    },
    getPoliciesData(state) {
      let policiesArr = state.advancedSearchResponse.filter((item) => {
        return item.registry === "Policies";
      });
      return policiesArr;
    },
    getCollectionsData(state) {
      let collectionsArr = state.advancedSearchResponse.filter((item) => {
        return item.registry === "Collection";
      });
      return collectionsArr;
    },
    getMetricsData(state) {
      let metricsArr = state.advancedSearchResponse.filter((item) => {
        return item.type === "metric";
      });
      return metricsArr;
    },
    getPrinciplesData(state) {
      let principlesArr = state.advancedSearchResponse.filter((item) => {
        return item.type === "principle";
      });
      return principlesArr;
    },
    getBenchmarksData(state) {
      let benchmarksArr = state.advancedSearchResponse.filter((item) => {
        return item.type === "benchmark";
      });
      return benchmarksArr;
    },
  },
});
