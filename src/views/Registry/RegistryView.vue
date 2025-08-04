<template>
  <v-banner
    bg-color="red"
    class="mb-10"
    rounded
    sticky
    text="This Alpha system is under construction  and some functionalities are still under development"
  />
  <CollapseTreeGraph />
  <SelectRecordType class="mx-auto mt-6" />
  <div class="d-flex">
    <ObjectTypeFilter />
    <MetricsToolFilter />
  </div>
  <div class="d-flex">
    <SubjectFilter />
    <OrganisationsFilter />
  </div>
  <MetricsNameFilter />
  <ApplyFilterButton />
  <ResultTableView />
</template>
<script>
import CollapseTreeGraph from "@/components/Registry/CollapseTreeGraph";
import ApplyFilterButton from "@/components/Registry/ApplyFilterButton.vue";
import ResultTableView from "@/views/Registry/ResultTableView.vue";

import {
  MetricsNameFilter,
  MetricsToolFilter,
  ObjectTypeFilter,
  OrganisationsFilter,
  SelectRecordType,
  SubjectFilter,
} from "@/components/Registry/FilterComponents";

export default {
  name: "RegistryView",
  components: {
    CollapseTreeGraph,
    ApplyFilterButton,
    ResultTableView,
    ObjectTypeFilter,
    SelectRecordType,
    SubjectFilter,
    OrganisationsFilter,
    MetricsToolFilter,
    MetricsNameFilter,
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
