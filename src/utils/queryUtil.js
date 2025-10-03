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
      //Replace spaces with _ in the string in order to avoid + sign in URL
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

export default generateSelectionQuery;
