<template>
  <div id="menuWrapper">
    <div>
      <v-icon
        v-if="!overlay"
        id="menu-activator"
        class="hamburgerIcon"
        color="white"
        icon="fa fa-bars"
        size="40"
        @click="overlay = true"
      />
      <v-icon
        v-else
        id="menu-activator"
        class="hamburgerIcon"
        color="white"
        icon="fa fa-xmark"
        size="40"
        @click="overlay = false"
      />
    </div>
    <v-menu activator="#menu-activator">
      <v-list>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.link"
          :value="index"
          @click="overlay = false"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <div
      v-if="overlay"
      class="overlay bg-black opacity-20 position-absolute full-width fill-height top-0 left-0"
      @click="overlay = false"
    ></div>
  </div>
</template>
<script>
export default {
  name: "Menu",
  data() {
    return {
      overlay: false,
      menuItems: [
        { title: "Home", link: "/" },
        { title: "Tools", link: "/tools" },
        { title: "Registry", link: "/registry" },
        {
          title: "FairPrinciples",
          link: "/fairprinciples",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
#menuWrapper {
  z-index: 3;

  .hamburgerIcon {
    z-index: 4;
  }

  .overlay {
    z-index: 2;
  }
}
</style>
