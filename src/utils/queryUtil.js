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
      queryString += item[0] + "=" + item[1] + "&";
    }
  });
  //Removing the last "&" from the string
  queryString = queryString.slice(0, -1);
  queryString += ")";
  return queryString;
};

export default generateSelectionQuery;
