<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                prepend-icon="mdi-email"
                label="Email"
                name="email"
                type="email"
                :rules="emailRules"
                v-model="email"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                label="Password"
                name="password"
                :counter="10"
                type="password"
                :rules="passwordRules"
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              block
              :loading="loading"
              @click="onSubmit"
              :disabled="!valid || loading"
            >
              Войти
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      emailRules: [
        v => !!v || "Введите E-mail",
        v => /.+@.+\..+/.test(v) || "E-mail не корректен!"
      ],
      passwordRules: [
        v => !!v || "Введите пароль",
        v => (v && v.length >= 5) || "Пароль должен быть не менее 5 символов!",
        v =>
          (v && v.length <= 10) || "Пароль должен быть не больше 10 символов!"
      ]
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch("loginUser", user).then(() => {
          this.$router.push("/");
        });
      }
    },
    created() {
      if (this.$route.query("loginError")) {
        this.$store.dispatch("setError", "You not access!");
      }
    }
  }
};
</script>
