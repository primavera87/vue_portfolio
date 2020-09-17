<template>
  <v-app>
    <app-notification></app-notification>
    <app-nav-bar />
  </v-app>
</template>

<script>
import AppNavBar from "./components/NavBar/Navbar";
import AppNotification from "./components/Notification/Notification";

export default {
  components: {
    AppNavBar,
    AppNotification
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  }
};
</script>

<style lang="scss">
@import "assets/styles/variables.scss";
@import "assets/styles/main.scss";
</style>
