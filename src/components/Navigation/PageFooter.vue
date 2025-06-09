<template>
  <div class="footer-container position-relative text-white py-2 px-6">
    <div class="footer-dash" />
    <p class="mb-0">
      The FAIRassist site is currently under construction. Please
      <a href="mailto:contact@fairsharing.org">contact us</a> if you wish to
      share feedback.
    </p>
    <v-row class="text-white pt-5 py-2 px-6 justify-space-evenly">
      <!--  Footer Blocks  -->
      <v-col
        v-for="(block, index) in footerData"
        :key="block.header + '_' + index"
        class="flex-column align-center d-flex"
        xl="auto"
      >
        <h4 class="min-width-200 mb-2">
          {{ block.header }}
        </h4>
        <ul class="pa-0">
          <li
            v-for="(item, blockIndex) in block.content"
            :key="item.title + '_' + blockIndex"
          >
            <a
              v-if="item.url"
              :href="item.url"
              class="underline-effect d-flex justify-space-between"
              rel="noreferer,noopener"
              target="_blank"
            >
              <Icon v-if="item.icon" :class="item.icon" :item="item.icon" />
              {{ item.title }}
            </a>
            <span v-else>{{ item.title }}</span>
          </li>
        </ul>
      </v-col>
    </v-row>
    <!--Licence and copy right -->
    <div class="d-flex flex-row justify-center align-center mb-2 pt-6">
      <p class="mb-0">
        © FAIRsharing 2025-Present | Licenced under
        <a
          class="mr-2 underline-effect"
          href="http://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          >Creative Commons Attribution Share Alike 4.0 International</a
        >
        <a class="underline-effect" href="/licence"
          ><img
            alt="FAIRsharing licence"
            height="31px"
            src="/assets/Home/Footer/FAIRsharingCC_BY_SA.png"
            width="88px"
        /></a>
      </p>
    </div>
  </div>
</template>

<script>
import footerData from "@/data/footerData.json";
import Icon from "@/components/Icon/Icon.vue";

export default {
  name: "PageFooter",
  components: { Icon },
  data: () => {
    return {
      footerData,
    };
  },
};
</script>
<style lang="scss" scoped>
li {
  min-width: 200px;
}

.footer-container {
  background: #253442;
}

.footer-dash {
  position: absolute;
  top: -2px;
  left: 0;
  width: 100%;
  border-top: 3px dashed #253442;
}
</style>
