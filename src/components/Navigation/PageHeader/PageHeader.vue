<template>
  <div class="d-flex flex-column justify-start">
    <Jumbotron />
  </div>
</template>

<script>
import Jumbotron from "./Jumbotron.vue";

export default {
  name: "PageHeader",
  components: { Jumbotron },
};
</script>
