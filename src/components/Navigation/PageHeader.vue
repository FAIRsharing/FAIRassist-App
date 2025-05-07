<template>
  <section
    data-testid="jumbotron"
    class="px-md-10 pa-5 d-flex flex-column justify-center mb-6"
    :style="[
      'z-index: 2',
      {
        backgroundImage:
          'linear-gradient(180deg, rgba(37, 52, 66, 1) 0%, rgba(39, 170, 225, 1) 200%),url(' +
          '/assets/Home/BlockHero/pattern3.jpg',
        backgroundRepeat: 'repeat',
        backgroundBlendMode: 'multiply',
      },
    ]"
    :class="addClass()"
  >
    <!-- eslint-disable vue/no-v-html -->
    <vue-particles
      id="particles"
      :options="options"
      @particles-loaded="particlesLoaded"
    />
    <h1
      class="text-body-1 pt-2 text-sm-h4 text-md-h4 text-lg-h4 text-xl-h4 font-weight-medium text-white"
      style="z-index: 2"
    >
      {{ pageHeaderData["title"] }}
      <em
        v-if="pageHeaderData['tempSubTitle']"
        data-testid="tempSubTitle"
        class="text-green"
      >{{ pageHeaderData["tempSubTitle"] }}</em
      >
    </h1>
    <h2
      v-if="pageHeaderData['subTitle']"
      data-testid="subTitle"
      :class="[
        'lato-font-medium my-4 text-primary px-1 font-weight-thin',
        {
          'lato-text-md': $vuetify.display.mdOnly,
          'lato-text-lg': $vuetify.display.lgAndUp,
          'lato-text-sm': $vuetify.display.smAndDown,
        },
      ]"
      style="z-index: 2"
    >
      {{ pageHeaderData["subTitle"] }}
    </h2>
  </section>
</template>

<script>
import { loadFull } from "tsparticles";

// These consts appear to be called by the tests but aren't shown as covered.
/* v8 ignore start */
const particlesInit = async (engine) => {
  await loadFull(engine);
};

// eslint-disable-next-line no-unused-vars
const particlesLoaded = async (container) => {
  //console.log("Particles container loaded", container);
};
/* v8 ignore stop */
export default {
  name: "PageHeader",
  props: {
    pageHeaderData: {default: null, type: Object}
  },
  data: () => {
    return {
      particlesInit,
      particlesLoaded,
      options: {
        background: {
          color: {
            value: "transparent",
          },
        },
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          color: {
            value: "#1F8EBF",
          },
          links: {
            color: "#1F8EBF",
            distance: 100,
            enable: true,
            opacity: 0.5,
            width: 2,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: "bounce",
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            value: 30,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: null,
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }
    };
  },
  methods: {
    // TODO: This should be under computed but when placed there addClass can't find it.
    addClass: function () {
      if (this.pageHeaderData["pageName"] === "HomeView") {
        return "heroBlock";
      }
    },
  },
};
</script>

<style>
.heroBlock {
  transition-duration: inherit;
  transform: translateX(0);
  animation: smooth-text 2500ms ease-in forwards;
}
@keyframes smooth-text {
  0%,
  25% {
    opacity: 0;
  }
  75%,
  100% {
    opacity: 1;
  }
}

#particles canvas {
  position: absolute;
  width: 100% !important;
  height: 50px !important;
  max-height: 100px !important;
  z-index: 1;
  left: 0;
  top: 0;
}

#subtitle a {
  color: white;
  text-decoration: underline;
}
</style>
