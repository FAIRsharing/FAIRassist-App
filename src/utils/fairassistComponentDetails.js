import axios from "axios";

/**
 * Get the array list for the filters
 * @param {Number} id - Either 1236 or 4100
 * @param {Array} filterSelected - Filter selected to produce data
 * @return {Array} - List of the ids
 */
const fairassistComponentDetails = async (id, filterSelected) => {
  let arrayList = [];
  let noData = false;
  try {
    const url =
      import.meta.env.VITE_API_ENDPOINT + "/fairassist_component_details/" + id;
    const getList = await axios.get(url);
    filterSelected.forEach((item) => {
      if (getList["data"][item]) {
        arrayList.push(getList["data"][item]);
      }
    });
  } catch (error) {
    if (error) {
      noData = true;
    }
  }
  return noData ? "No data available" : arrayList.flat(1);
};

export default fairassistComponentDetails;
