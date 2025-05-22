<template>
  <div class="d-flex flex-column justify-start align-stretch">
    <Jumbotron />
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
import Jumbotron from "../../components/Navigation/Jumbotron.vue";
export default {
  name: "HomeView",
  components: { Jumbotron },
};
</script>
