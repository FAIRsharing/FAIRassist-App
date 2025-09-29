<template>
  <v-banner
    v-if="getRecordTypeSelected && getRecordTypeSelected.length"
    bg-color="#f5f5f5"
    border
    class="mt-10"
    rounded
    sticky
  >
    <h3 class="d-inline">Search Results For :&nbsp;</h3>
    <v-chip
      v-for="selection in getRecordTypeSelected"
      :keys="selection"
      :text="capitalize(this.cleanString(selection))"
      class="ma-1"
      color="primary"
      variant="elevated"
    />
    <v-chip
      v-for="selection in getObjectTypeSelected"
      :keys="selection"
      :text="capitalize(this.cleanString(selection))"
      class="ma-1"
      color="primary"
      variant="elevated"
    />
    <v-chip
      v-for="selection in getToolsSelected"
      :keys="selection"
      :text="capitalize(this.cleanString(selection))"
      class="ma-1"
      color="primary"
      variant="elevated"
    />
    <v-chip
      v-for="selection in getSubjectSelected"
      :keys="selection"
      :text="capitalize(this.cleanString(selection))"
      class="ma-1"
      color="primary"
      variant="elevated"
    />
    <v-chip
      v-for="selection in getOrganisationSelected"
      :keys="selection"
      :text="capitalize(this.cleanString(selection))"
      class="ma-1"
      color="primary"
      variant="elevated"
    />
  </v-banner>
</template>
<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

import { storeToRefs } from "pinia";
import { capitalize } from "lodash";
import stringUtils from "@/utils/stringUtils.js";

export default {
  name: "Breadcrumbs",
  mixins: [stringUtils],
  methods: { capitalize },
  setup() {
    const advancedSearchStore = useAdvancedSearchStore();
    const {
      getRecordTypeSelected,
      getObjectTypeSelected,
      getSubjectSelected,
      getToolsSelected,
      getOrganisationSelected,
    } = storeToRefs(advancedSearchStore);
    return {
      advancedSearchStore,
      getRecordTypeSelected,
      getObjectTypeSelected,
      getSubjectSelected,
      getToolsSelected,
      getOrganisationSelected,
    };
  },
};
</script>
