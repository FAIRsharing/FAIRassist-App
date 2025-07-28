import { defineStore } from "pinia";
import GraphClient from "@/lib/GraphClient/GraphClient.js";
import advancedQuery from "@/lib/GraphClient/queries/getAdvancedSearch.json";
import fairassistComponentDetails from "@/utils/fairassistComponentDetails.js";
import { jsonToGraphQLQuery } from "json-to-graphql-query";

const CLIENT = new GraphClient(),
  ADVANCED_TAGS = JSON.parse(JSON.stringify(advancedQuery));

export const useAdvancedSearchStore = defineStore("advancedSearch", {
  state: () => ({
    recordTypeSelected: [],
    fairassistID: null,
    advancedSearch: {},
    advancedSearchResponse: [],
    loadingStatus: false,
    errorStatus: false,
    noData: false,
    objectTypeSelected: {},
    subjectSelected: {},
    organisationSelected: {},
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

      whereObjData.fields.push(
        this.objectTypeSelected,
        this.subjectSelected,
        this.organisationSelected,
      );
      //Below is the format required for jsonToGraphQlQuery
      let parentQuery = {};
      parentQuery["query"] = {};
      parentQuery["__args"] = whereObjData;
      parentQuery.query["__args"] = {
        where: whereObjData,
      };
      let graphqlQuery = jsonToGraphQLQuery(parentQuery, { pretty: true });

      graphqlQuery = graphqlQuery.replace("query", "").trim();
      graphqlQuery = graphqlQuery.match(/^\((.*)\)$/)[1];

      let whereObj = graphqlQuery.replace("where:", "");

      // let whereObJQuery = `{operator: "_and", fields: []}`;
      ADVANCED_TAGS.queryParam = {
        id: searchIds,
        where: whereObj,
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
            //Temperory code to show only limited items
            let fairassistRelations = response["advancedSearch"].map(
              ({ fairassistRelations }) => fairassistRelations,
            );
            fairassistRelations = fairassistRelations.flat(1);
            //For metrics
            if (fairassistRelations.length) {
              this.advancedSearchResponse = fairassistRelations.map(
                ({ name, type, homepage }) => ({
                  name,
                  type,
                  homepage,
                }),
              );
            }
            //For benchmarks
            else {
              this.advancedSearchResponse = response["advancedSearch"].map(
                ({ name, type, homepage }) => ({
                  name,
                  type,
                  homepage,
                }),
              );
            }
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
  },
});
