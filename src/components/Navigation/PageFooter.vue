<template>
  <div class="footer-container text-white pt-5 py-2 px-6">
    <!--  Licence and copy right  -->
    <p class="mb-0">
      The FAIRassist site is currently under construction. Please
      <a href="mailto:contact@fairsharing.org">contact us</a> if you wish to
      share feedback.
    </p>
    <p style="text-align: center" class="mb-0">
      © FAIRsharing 2009-Present | Licenced under
      <a
        class="mr-2 underline-effect"
        href="http://creativecommons.org/licenses/by-sa/4.0/"
        target="_blank"
        >Creative Commons by Share Alike 4.0 International</a
      >
      <a href="/licence" class="underline-effect"
        ><img
          src="/assets/Home/Footer/FAIRsharingCC_BY_SA.png"
          alt="FAIRsharing licence"
          width="88px"
          height="31px"
      /></a>
    </p>
  </div>
</template>

<script>
export default {
  name: "PageFooter",
};
</script>
<style scoped lang="scss">
li {
  min-width: 200px;
}

.footer-container {
  background: #253442;
  bottom: 0;
  width: 100%;
  & p {
    position: relative;
    font-size: 13px;
    & sup {
      top: 6px;
      position: absolute;
      left: -7px;
    }
  }
}

.footer-dash {
  position: absolute;
  top: -2px;
  left: 0;
  width: 100%;
  border-top: 3px dashed #253442;
}
</style>
