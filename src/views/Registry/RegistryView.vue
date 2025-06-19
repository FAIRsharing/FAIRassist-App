<template>
  <CollapseTreeGraph />
  <FilterMetricsBenchmarks />
  <!--  <FairPrinciples />-->
</template>
<script>
import CollapseTreeGraph from "@/components/Registry/CollapseTreeGraph";
import FilterMetricsBenchmarks from "@/components/Registry/FilterMetricsBenchmarks";
// import FairPrinciples from "@/components/Registry/FairPrinciples";

export default {
  name: "RegistryView",
  components: { CollapseTreeGraph, FilterMetricsBenchmarks },
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

<style lang="scss" scoped></style>
