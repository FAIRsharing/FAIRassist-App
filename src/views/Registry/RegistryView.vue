<template>
  <v-banner
    bg-color="red"
    class="mb-10"
    rounded
    sticky
    text="This Alpha system is under construction  and some functionalities are still under development"
  />
  <CollapseTreeGraph />
  <SelectRecordType class="mt-6 mx-auto" />
  <div class="d-flex justify-center">
    <ObjectTypeFilter />
    <MetricsToolFilter />
  </div>
  <MetricsNameFilter class="mx-auto" />
  <div class="d-flex justify-center">
    <SubjectFilter />
    <OrganisationsFilter />
  </div>
  <ApplyFilterButton />
  <MetricsBenchmarkTable />
</template>
<script>
import CollapseTreeGraph from "@/components/Registry/CollapseTreeGraph";
import ApplyFilterButton from "@/components/Registry/ApplyFilterButton.vue";
import MetricsBenchmarkTable from "@/components/Registry/MetricsBenchmarkTable";

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
    MetricsBenchmarkTable,
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
