<template>
  <v-app id="app">
    <div
      class="d-flex appWrapper fill-height flex-column justify-space-between"
    >
      <router-view />
      <PageFooter />
    </div>
  </v-app>
</template>

<script>
import PageFooter from "@/components/Navigation/PageFooter.vue";
export default {
  name: "App",
  components: { PageFooter },
  data() {
    return {
      loading: true,
    };
  },

  /* v8 ignore start */
  async updated() {
    // very important line of code which prevents layout shifting which is considered as one negative point for SEO
    await this.$nextTick();
    this.loading = false;
  },
  /* v8 ignore stop */
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 99vh;
}

html,
body {
  height: 100%;
}

.appWrapper {
  position: relative;
  height: 100%;
}
</style>
