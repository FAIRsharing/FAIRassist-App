import GraphClient from "@/lib/GraphClient/GraphClient.js";
import searchSubjects from "@/lib/GraphClient/queries/getSubjects.json";
import { defineStore } from "pinia";

const CLIENT = new GraphClient(),
  SEARCH_SUBJECTS = JSON.parse(JSON.stringify(searchSubjects));

export const useSubjectSearchStore = defineStore("subjectSearch", {
  state: () => ({
    searchSubjects: [],
    loadingStatus: false,
  }),

  actions: {
    async fetchSearchSubjects(queryParams) {
      this.loadingStatus = true;
      SEARCH_SUBJECTS.queryParam = {
        q: queryParams,
      };
      let response = await CLIENT.executeQuery(SEARCH_SUBJECTS);

      let subjectListArr = [];
      response["searchSubjects"].forEach(({ label, children }) => {
        subjectListArr.push(label);
        if (children && children.length) {
          children.forEach(({ label }) => {
            subjectListArr.push(label);
          });
        }
      });
      const subjectList = [...new Set(subjectListArr)];
      this.searchSubjects = subjectList;

      this.loadingStatus = false;
    },
  },

  getters: {
    getSearchSubjects(state) {
      return state.searchSubjects;
    },
    getLoadingStatus(state) {
      return state.loadingStatus;
    },
  },
});
