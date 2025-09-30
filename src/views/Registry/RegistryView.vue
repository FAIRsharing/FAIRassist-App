<template>
  <v-banner
    bg-color="red"
    class="mb-10"
    rounded
    text="This Alpha system is under construction  and some functionalities are still under development"
  />
  <CollapseTreeGraph />
  <Breadcrumbs />
  <SelectRecordType class="mx-auto mt-6" />
  <FiltersView />
  <ApplyFilterButton />
  <ResultTableView />
</template>
<script>
import CollapseTreeGraph from "@/components/Registry/CollapseTreeGraph";
import ApplyFilterButton from "@/components/Registry/ApplyFilterButton.vue";
import ResultTableView from "@/views/Registry/ResultTableView.vue";
import FiltersView from "@/views/Registry/FiltersView.vue";

import { SelectRecordType } from "@/components/Registry/FilterComponents";
import Breadcrumbs from "@/components/Registry/Breadcrumbs/Breadcrumbs.vue";

export default {
  name: "RegistryView",
  components: {
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
};
</script>
