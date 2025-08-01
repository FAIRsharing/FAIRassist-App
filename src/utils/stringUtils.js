const stringUtils = {
  methods: {
    cleanString(string) {
      if (typeof string === "string") {
        if (string.includes("_")) {
          return string.replace(/_/g, " ");
        }
      }
      return string;
    },
  },
};

export default stringUtils;
