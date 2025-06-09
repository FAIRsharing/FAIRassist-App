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
          <v-card-title class="text-white text-h4">
            <span class="text-primary"> {{ item.textFAIR }}</span
            ><span>{{ item.textAssist }}</span>
          </v-card-title>
          <v-card-subtitle class="text-white opacity-100 white-space-normal">
            <h2 class="font-italic">
              {{ item.subText }}
            </h2></v-card-subtitle
          >
        </v-card-item>
      </v-card>
      <div class="mt-3 text-center text-h5">
        <p v-html="item.description" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HomeButtons",
  data() {
    return {
      registry: [
        {
          textFAIR: "FAIR",
          textAssist: "assist",
          subText: "signposting tools",
          description:
            "Discover <strong><em>tools</em></strong> for evaluation, assistance and assessment, or register your own",
          color: "accent3",
          href: "/tools",
        },
        {
          textFAIR: "FAIR",
          textAssist: "assist",
          subText: "principles, metrics, benchmarks",
          description:
            "Discover <strong><em>metrics</em></strong> for evaluation, assistance and assessment tools, or register your own",
          color: "accent",
          href: "/registry",
        },
      ],
    };
  },
};
</script>
