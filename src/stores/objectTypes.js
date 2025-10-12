import { defineStore } from "pinia";
import GraphClient from "@/lib/GraphClient/GraphClient.js";
import objectTypesQuery from "@/lib/GraphClient/queries/getObjectTypes.json";
import { orderBy } from "lodash";

const CLIENT = new GraphClient();

export const useObjectTypesStore = defineStore("objectTypes", {
  state: () => ({
    objectTypes: [],
    loadingStatus: false,
  }),
  actions: {
    async fetchObjectTypes() {
      this.loadingStatus = true;
      let response = await CLIENT.executeQuery(objectTypesQuery);
      if (
        response["objectTypes"].records &&
        response["objectTypes"].records.length
      ) {
        //Sort the object types alphabetically
        let objectTypesList = orderBy(
          response["objectTypes"].records,
          ["label"],
          ["asc"],
        );

        objectTypesList = objectTypesList.map(({ label }) => label);
        this.objectTypes = objectTypesList;
      }

      this.loadingStatus = false;
    },
  },

  getters: {
    getObjectTypes(state) {
      return state.objectTypes;
    },
    getLoadingStatus(state) {
      return state.loadingStatus;
    },
  },
});
