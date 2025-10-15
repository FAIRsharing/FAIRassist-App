<template>
  <div>
    <v-dialog :model-value="showPopup" max-width="400">
      <v-card class="pa-4">
        <v-card-text>
          <div>
            Changing between FAIR and FAIR4RS principles will clear your search
            results.
          </div>
        </v-card-text>
        <v-card-actions
          :class="{
            'flex-column align-center': $vuetify.display.smAndDown,
          }"
          class="px-6 justify-space-between"
        >
          <v-btn
            :class="{
              'mb-3': $vuetify.display.smAndDown,
            }"
            :width="$vuetify.display.smAndDown ? '100%' : '150'"
            class="text-white bg-green"
            data-testid="resetSelection"
            elevation="2"
            fdfdfd
            variant="text"
            @click="resetSelection()"
          >
            OK
          </v-btn>
          <v-btn
            :width="$vuetify.display.smAndDown ? '100%' : '150'"
            class="ml-0 bg-accent3"
            data-testid="noResetSelection"
            elevation="2"
            variant="text"
            @click="noResetSelection()"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { useAdvancedSearchStore } from "@/stores/advancedSearch.js";

export default {
  name: "WarningDialog",
  emits: ["yesReset", "noReset"],
  props: {
    showDialog: { type: Boolean, default: false },
  },
  data: () => {
    return {
      showPopup: false,
    };
  },
  setup() {
    const store = useAdvancedSearchStore();
    return {
      store,
    };
  },
  watch: {
    showDialog(newValue) {
      if (newValue) {
        this.showPopup = true;
      }
    },
  },

  methods: {
    /**
     * Reset the selection and the results
     */
    resetSelection() {
      this.showPopup = false;
      this.store.resetSelection = true;
      this.store.resetAdvancedSearch();
      this.$router.replace("/registry");
      this.$emit("yesReset", true);
    },

    /**
     * Do not reset the selection and keep the results
     */
    noResetSelection() {
      this.$emit("noReset", true);
      // this.fairassistID = this.currentId;
      this.showPopup = false;
    },
  },
};
</script>
