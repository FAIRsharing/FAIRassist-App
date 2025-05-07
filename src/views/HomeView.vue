<template>
  <div class="d-flex flex-column justify-start align-stretch">
    <PageHeader
      :page-header-data='{
        "pageName": "HomeView",
        "title": "FAIRassist",
        "subTitle": "Welcome to FAIRassist, providing you with FAIR-enabling stuff and things.",
        "tempSubTitle": ""
      }'
    />
    <v-container
      fluid
      class="wrapperClass d-flex flex-column align-content-stretch"
    >
      <p>This is the home page.</p>
      <p>Eventually, some interesting content will go here.</p>
    </v-container>
  </div>
</template>

<script>
import PageHeader from "@/components/Navigation/PageHeader.vue";
export default {
  name: "HomeView",
  components: {
    PageHeader
  },
};
</script>


