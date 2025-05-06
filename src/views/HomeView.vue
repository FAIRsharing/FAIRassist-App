<template>
  <div class="d-flex flex-column justify-start align-stretch">
    <PageHeader />
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


