<template>
  <v-row class="align-center justify-center fill-height">
    <v-col
      v-for="item in registry"
      :key="item.id"
      class="card-column-wrapper full-width"
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
          <v-card-title class="text-white text-h4">
            <span class="text-primary"> {{ item.textFAIR }}</span
            ><span>{{ item.textAssist }}</span
            ><br /><span class="font-italic"> {{ item.subText }}</span>
          </v-card-title>
        </v-card-item>
      </v-card>
      <div
          :class="{ 'button-desc-md': $vuetify.display.md }"
          class="mt-3 text-center text-h5 me-auto full-width"
      >
        <p v-html="item.description" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "RegistryButtons",
  data() {
    return {
      registry: [
        {
          textFAIR: "FAIR",
          textAssist: "assist",
          subText: "tabular view",
          description: "Browse a <strong><em>compact table</em></strong> of principles, metrics and benchmarks",
          color: "secondary",
          href: "/registry/table",
        },
        {
          textFAIR: "FAIR",
          textAssist: "assist",
          subText: "faceted search",
          description: "View <strong><em>summaries of standards, databases and policies</em></strong> relating to the metrics and benchmarks you choose",
          color: "accent2",
          href: "/registry/search",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.card-column-wrapper {
  max-width: 840px;
}

.button-desc-md {
  max-width: 420px;
}
</style>
