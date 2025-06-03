<template>
  <div>
    <v-dialog :model-value="showForm">
      <v-card>
        <v-card-title class="text-right">
          <v-btn icon @click="showForm = false">
            <v-icon icon="fa fa-xmark fa-solid" size="35" />
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div v-html="googleFormHtml"></div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-btn
      class="mb-5 d-flex mx-auto my-0"
      color="accent2"
      data-testid="registerResourceBtn"
      elevated
      @click="showForm = true"
      >Register a new resource
    </v-btn>
  </div>
</template>
<script>
export default {
  name: "RegisterResource",
  data() {
    return {
      showForm: false,
      googleFormHtml: `<iframe src="https://docs.google.com/forms/d/e/${import.meta.env.VITE_GOOGLE_FORM_ID}/viewform?embedded=true" width="100%" height="640" frameborder="0">Loading...</iframe>`,
    };
  },
};
</script>
