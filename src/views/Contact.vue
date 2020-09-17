<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <h1>Контакты</h1>
        <p>Вы можете связаться с автором, написав ему:</p>

        <h3>E-mail: email@email.ru</h3>

        <p>Или через форму отправки сообщений:</p>
      </v-col>
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                :counter="10"
                label="Имя"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-textarea
                v-model="message"
                autocomplete="Сообщение"
                label="Сообщение"
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!email || !message || loading"
              color="primary"
              block
              :loading="loading"
              @click="submit"
              >Отправить</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },

  data: () => ({
    name: "",
    email: "",
    message: "",
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false
  }),

  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  },
  mounted() {
    this.$store.dispatch("setLoading", false);
  },
  methods: {
    submit() {
      if (this.$refs.form.validate() && this.name !== "" && this.email !== "") {
        try {
          this.$store
            .dispatch("createMessage", {
              name: this.name,
              email: this.email,
              message: this.message
            })
            .then(() => {
              this.$store.dispatch("notification", {
                type: "success",
                value: true,
                title: "Сообщение успешно отправлено!"
              });
              this.$refs.form.reset();
            });

          // .then(() => {
          //   this.$router.push("/gallery");
          // });
        } catch (e) {
          this.$store.dispatch("notification", {
            type: "warning",
            value: true,
            title: "Сообщение отправлено не было!"
          });
        }
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    }
  }
};
</script>
