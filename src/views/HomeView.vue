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
    <p>This is the home page.</p>
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


