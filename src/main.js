import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import vuetify from "./plugins/vuetify";
import * as firebase from "firebase/app";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    const firebaseConfig = {
      apiKey: "AIzaSyAtXA6RSDlYdEbtFHQVDxUnp7cZ0XtPOq8",
      authDomain: "larisaonlineportfolio.firebaseapp.com",
      databaseURL: "https://larisaonlineportfolio.firebaseio.com",
      projectId: "larisaonlineportfolio",
      storageBucket: "larisaonlineportfolio.appspot.com",
      messagingSenderId: "537089579729",
      appId: "1:537089579729:web:f8ad01c45aa3dabda603f0",
      measurementId: "G-E2W2K4LKZQ"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoLoginUser", user);
      }
    })
    this.$store.dispatch('fetchImages')
  }
}).$mount("#app");
