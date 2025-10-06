import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

const advancedSearchStore = useAdvancedSearchStore();

/**
 * Add filter selection to query params in
 * and create URL by inserting Array of objects into string
 * @param {String} principle - Registry name
 * @param {Array} selection - Array of objects with filter selection
 * @return {String} - Query string with filter selections
 */

const generateSelectionQuery = (principle, selection) => {
  let selectionObj = Object.assign({}, ...selection);

  let objectEntriesArr = Object.entries(selectionObj);
  let queryString = "";
  queryString += "(";
  queryString += "principle=" + principle + "&";
  objectEntriesArr.forEach((item) => {
    if (item[1] && item[1].length) {
      //Replace blank spaces with _ in the string to avoid + sign in URL
      item[1] = item[1].map((str) => {
        return str.replace(/\s/g, "_");
      });
      queryString += item[0] + "=" + item[1].join("OR") + "&";
    }
  });
  //Removing the last "&" from the string
  queryString = queryString.slice(0, -1);
  queryString += ")";
  return queryString;
};

/**
 * Fetches the query parameters from the URL and sets the store values accordingly
 * @param {String} route - Route object from Vue Router
 */
const fetchQueryParams = async (route) => {
  // Checking if advancedsearch has query parameters
  if (Object.values(route.query).length) {
    const routeQuery = route.query;

    //Destructuring the field string into valid advancedsearch format to execute the query
    const searchFieldsArr = routeQuery["search"]
      .split(/^\((.*)\)$/) //removes only first and last parenthesis
      .filter((item) => item); //Filter is used to remove empty string

    const searchItemsArr = searchFieldsArr[0].split("&");
    searchItemsArr.forEach((subItem) => {
      const paramValues = subItem.split("=");
      //For fairassist id
      if (paramValues[0] === "principle") {
        if (paramValues[1] === "FAIR Principles for Research Software") {
          advancedSearchStore.fairassistID = 4100;
        } else if (paramValues[1] === "The FAIR Principles") {
          advancedSearchStore.fairassistID = 1236;
        }
      }
      //For record type the response should be an array as it is a multiple values select dropdown
      else if (paramValues[0] === "recordType") {
        advancedSearchStore.recordTypeSelected = paramValues[1].split("OR");
      }
      //For objectTypes
      else if (paramValues[0] === "objectTypes") {
        advancedSearchStore.objectTypeSelected = {
          //Replaces _ from the URL to blank spaces in value selection
          objectTypes: paramValues[1].replace(/_/g, " ").split("OR"),
        };
      }
      //For subjects
      else if (paramValues[0] === "subjects") {
        advancedSearchStore.subjectSelected = {
          subjects: paramValues[1].replace(/_/g, " ").split("OR"),
        };
      }
      //For organisations
      else if (paramValues[0] === "organisations") {
        advancedSearchStore.organisationSelected = {
          organisations: paramValues[1].replace(/_/g, " ").split("OR"),
        };
      }
      //For toolNames
      else if (paramValues[0] === "toolNames") {
        advancedSearchStore.toolsSelected = {
          toolNames: paramValues[1].replace(/_/g, " ").split("OR"),
        };
      }
    });
    await advancedSearchStore.fetchAdvancedSearchResults();
  }
};

export { generateSelectionQuery, fetchQueryParams };
