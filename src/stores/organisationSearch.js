import GraphClient from "@/lib/GraphClient/GraphClient.js";
import getOrganisations from "@/lib/GraphClient/queries/getOrganisations.json";
import { defineStore } from "pinia";

const CLIENT = new GraphClient(),
  SEARCH_ORGANISATIONS = JSON.parse(JSON.stringify(getOrganisations));
export const useOrganisationSearchStore = defineStore("organisationSearch", {
  state: () => ({
    searchOrganisations: [],
    loadingStatus: false,
  }),

  actions: {
    async fetchSearchOrganisations(queryParams) {
      this.loadingStatus = true;
      SEARCH_ORGANISATIONS.queryParam = {
        q: queryParams,
      };
      let response = await CLIENT.executeQuery(SEARCH_ORGANISATIONS);
      if (
        response["searchOrganisations"] &&
        response["searchOrganisations"].length
      ) {
        const organisationsList = response["searchOrganisations"].map(
          ({ name }) => name,
        );
        this.searchOrganisations = organisationsList;
      }
      this.loadingStatus = false;
    },
  },

  getters: {
    getSearchOrganisations(state) {
      return state.searchOrganisations;
    },

    getLoadingStatus(state) {
      return state.loadingStatus;
    },
  },
});
