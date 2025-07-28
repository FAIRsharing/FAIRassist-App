import { defineStore } from "pinia";
import GraphClient from "@/lib/GraphClient/GraphClient.js";
import objectTypesQuery from "@/lib/GraphClient/queries/getObjectTypes.json";

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
        const objectTypesList = response["objectTypes"].records.map(
          ({ label }) => label,
        );
        this.objectTypes = objectTypesList;
      }

      this.loadingStatus = false;
    },
    resetRecords() {
      this.objectTypes = [];
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
