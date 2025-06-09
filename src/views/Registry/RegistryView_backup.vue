<template>
  <v-row class="align-center justify-center fill-height">
    <v-col
      v-for="item in registry"
      :key="item.id"
      cols="12"
      lg="5"
      md="5"
      sm="12"
      xl="5"
    >
      <v-card
        :color="item.color"
        :href="item.href"
        class="full-width d-flex align-center text-center flex-column justify-center"
        elevation="4"
        height="130"
      >
        <v-card-item class="d-flex align-center">
          <v-card-title
            class="text-white text-md-h5 text-sm-h5 white-space-normal"
          >
            <span> {{ item.text }}</span>
          </v-card-title>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "RegistryView",
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
