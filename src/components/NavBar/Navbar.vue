<template>
  <v-container>
    <v-navigation-drawer v-model="drawer" app temporary clipped>
      <v-list shaped>
        <v-list-item v-for="(link, i) in links" :key="i" :to="link.url">
          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="onLogout" v-if="isUserLoggedIn">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="'Выйти'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense clipped-left>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">
          {{ title }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(link, i) in links" :key="i" :to="link.url"
          >{{ link.title }}
        </v-btn>
        <v-btn @click="onLogout" v-if="isUserLoggedIn">
          <v-icon left>mdi-exit-to-app</v-icon>
          Выйти
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // title: "Лариса Успенская",
      title: "Logo",
      drawer: false
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/");
    }
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          {
            title: "Главная",
            icon: "mdi-home",
            url: "/"
          },
          {
            title: "Биография",
            icon: "mdi-face",
            url: "/biography"
          },
          {
            title: "Галерея",
            icon: "mdi-image",
            url: "/gallery"
          },
          {
            title: "Контакты",
            icon: "mdi-help-box",
            url: "/contact"
          },
          {
            title: "Профиль",
            icon: "mdi-face-profile",
            url: "/admin"
          }
        ];
      } else {
        return [
          {
            title: "Главная",
            icon: "mdi-home",
            url: "/"
          },
          {
            title: "Биография",
            icon: "mdi-face",
            url: "/biography"
          },
          {
            title: "Галерея",
            icon: "mdi-image",
            url: "/gallery"
          },
          {
            title: "Контакты",
            icon: "mdi-help-box",
            url: "/contact"
          }
        ];
      }
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
