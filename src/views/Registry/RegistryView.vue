<template>
  <v-banner
    bg-color="red"
    class="mb-10"
    rounded
    sticky="true"
    text="This page is under construction"
  />

  <CollapseTreeGraph />
  <FilterMetricsBenchmarks />
</template>
<script>
import CollapseTreeGraph from "@/components/Registry/CollapseTreeGraph";
import FilterMetricsBenchmarks from "@/components/Registry/FilterMetricsBenchmarks";

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
