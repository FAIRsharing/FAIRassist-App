<template></template>
<script>
import fairData from "@/data/fair_principles.json";

export default {
  name: "FairPrinciples",
  mounted() {
    this.createD3Format();
  },
  methods: {
    createD3Format() {
      const data = fairData;

      const fairPrinciples = {
        id: 1236,
        name: "The FAIR Principles",
        abbreviation: "FAIR",
        status: "ready",
        children: [],
      };

      let d3Obj = {
        name: "",
        children: [],
      };
      //Adding second last item in each array as parent to last item of the array
      fairData.forEach((element) => {
        if (element.length) {
          let lastElement = element[element.length - 1];
          let secondLastElement = element[element.length - 2];
          lastElement.parentKey = secondLastElement.id;
        }
      });

      //Flattening the sub-array elements to same level
      let flatFairDataArr = fairData.flat();
      //Array without parentKey
      let arrayWithoutParentKey = flatFairDataArr.filter(
        (item) => !Object.keys(item).includes("parentKey"),
      );
      //Remove duplicates
      const ids = arrayWithoutParentKey.map(({ id }) => id);
      arrayWithoutParentKey = arrayWithoutParentKey.filter(
        ({ id }, index) => !ids.includes(id, index + 1),
      );
      //Array with parentKey
      let arrayWithParentKey = flatFairDataArr.filter((item) =>
        Object.keys(item).includes("parentKey"),
      );
      let withParentId = arrayWithParentKey.map(({ id }) => id);

      //Remove the entries which are also present in arrayWithParentKey from the array arrayWithoutParentKey
      arrayWithoutParentKey = arrayWithoutParentKey.filter(
        ({ id }) => !withParentId.includes(id),
      );

      let fairDataArr = [...arrayWithoutParentKey, ...arrayWithParentKey];
      console.log("fairDataArr::", fairDataArr);
      let childItems = [];
      let fairArr = [];
      fairDataArr.forEach((element) => {
        console.log("element 0::", element);
        console.log("fairArr -1::", fairArr);
        //If object is not present in array
        // if (!fairArr.some((e) => e.id === element.id)) {
        if (fairArr.indexOf(element) === -1) {
          console.log("element 1::", element);
          //If object does not have 'parentKey' key
          if (!Object.keys(element).includes("parentKey")) {
            console.log("element 4::", element);
            console.log("fairArr 0::", fairArr);

            fairArr.push(element);
            console.log("fairArr 1::", fairArr);
          } else if (Object.keys(element).includes("parentKey")) {
            console.log("element 2::", element);

            let parentItem = fairArr.find(
              (item) => item.id === element.parentKey,
            );

            console.log("parentItem 1:", parentItem);
            console.log("element 3::", element);
            childItems.push(element);
            console.log("childItems 1::", childItems);

            parentItem["children"] = childItems;
            console.log("parentItem 2:", parentItem);
          }
        }
      });
      console.log("fairArr::", fairArr);
    },
  },
};
</script>
