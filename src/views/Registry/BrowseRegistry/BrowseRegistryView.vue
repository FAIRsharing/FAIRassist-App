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
  <CollapseTreeGraph />
  <Breadcrumbs />
  <SelectRecordType class="mx-auto mt-6" />
  <FiltersView />
  <ApplyFilterButton />
  <ResultTableView />
</template>
<script>
import CollapseTreeGraph from "@/components/Registry/BrowseRegistry/CollapseTreeGraph.vue";
import ApplyFilterButton from "@/components/Registry/BrowseRegistry/ApplyFilterButton.vue";
import ResultTableView from "@/views/Registry/BrowseRegistry/ResultTableView.vue";
import FiltersView from "@/views/Registry/BrowseRegistry/FiltersView.vue";

import { SelectRecordType } from "@/components/Registry/BrowseRegistry/FilterComponents/index.js";
import Breadcrumbs from "@/components/Registry/BrowseRegistry/Breadcrumbs/Breadcrumbs.vue";
import Loaders from "@/components/Loaders/Loaders.vue";
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

export default {
  name: "BrowseRegistryView",
  components: {
    Loaders,
    CollapseTreeGraph,
    ApplyFilterButton,
    ResultTableView,
    SelectRecordType,
    FiltersView,
    Breadcrumbs,
  },
  data() {
    return {
      registry: [
        {
          text: "Filter and search metrics",
          color: "primary",
          href: "/search",
        },
        {
          text: "Navigate and browse FAIR Principles, metrics and benchmarks",
          color: "accent2",
          href: "/fairprinciples",
        },
      ],
    };
  },
  setup() {
    const store = useAdvancedSearchStore();
    return { store };
  },
};
</script>
