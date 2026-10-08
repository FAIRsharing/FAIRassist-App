<template>
  <v-banner
    bg-color="rgb(39,170,225)"
    class="mb-10"
    rounded
    text="This is a Beta system and some functionalities are still under active development."
  />
  <v-fade-transition v-if="store.loadingStatus">
    <div>
      <v-overlay
        :absolute="false"
        :model-value="store.loadingStatus"
        class="align-center justify-center"
        opacity="0.8"
      >
        <Loaders />
      </v-overlay>
    </div>
  </v-fade-transition>
  <div class="d-flex flex-column flex-md-row align-md-center ga-4 mb-6">
    <p class="ma-0">
      You’re exploring FAIRassist’s principles, metrics and benchmarks as
      relates to standards, databases and policies using our faceted search. You
      can also view the same content in a tabular format.
    </p>

    <v-btn color="primary" to="/registry/table" class="flex-shrink-0"
      >Tabular View</v-btn
    >
  </div>
  <CollapseTreeGraph />
  <Breadcrumbs />
  <SelectRecordType class="mx-auto mt-6" />
  <FiltersView />
  <ApplyFilterButton />
  <ResultTableView />
</template>
<script>
import CollapseTreeGraph from "@/components/Registry/SearchRegistry/CollapseTreeGraph.vue";
import ApplyFilterButton from "@/components/Registry/SearchRegistry/ApplyFilterButton.vue";
import ResultTableView from "@/views/Registry/SearchRegistry/ResultTableView.vue";
import FiltersView from "@/views/Registry/SearchRegistry/FiltersView.vue";

import { SelectRecordType } from "@/components/Registry/SearchRegistry/FilterComponents/index.js";
import Breadcrumbs from "@/components/Registry/SearchRegistry/Breadcrumbs/Breadcrumbs.vue";
import Loaders from "@/components/Loaders/Loaders.vue";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

export default {
  name: "SearchRegistryView",
  components: {
    Loaders,
    CollapseTreeGraph,
    ApplyFilterButton,
    ResultTableView,
    SelectRecordType,
    FiltersView,
    Breadcrumbs,
  },
  setup() {
    const store = useAdvancedSearchStore();
    return { store };
  },
};
</script>
