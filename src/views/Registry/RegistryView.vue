<template>
  <CollapseTreeGraph />
</template>
<script>
import CollapseTreeGraph from "@/components/Registry/CollapseTreeGraph";

export default {
  name: "RegistryView",
  components: { CollapseTreeGraph },
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
