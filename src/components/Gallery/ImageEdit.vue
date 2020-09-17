<template>
  <div>
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn v-if="isUserLoggedIn" color="success" dark v-on="on"
          >Редактировать</v-btn
        >
      </template>
      <v-card>
        <v-card-title>
          <v-list-item-title class="headline"
            >Редактирование картины</v-list-item-title
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  name="Title"
                  label="Название"
                  required
                  v-model="editTitle"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onCancel">Закрыть</v-btn>
          <v-btn color="success darken-1" text @click="onSave">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="removeDialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn v-if="isUserLoggedIn" color="warning" class="ml-3" dark v-on="on"
          >Удалить</v-btn
        >
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Удалить картину?</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onCancel">Закрыть</v-btn>
          <v-btn color="error darken-1" text @click="onDelete">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["image"],
  data() {
    return {
      editDialog: false,
      removeDialog: false,
      editTitle: this.image.title
    };
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    }
  },
  methods: {
    onCancel() {
      this.editTitle = this.image.title;
      this.editDialog = false;
      this.removeDialog = false;
    },
    onSave() {
      if (this.editTitle !== "") {
        this.$store.dispatch("updateImage", {
          title: this.editTitle,
          id: this.image.id
        });
      }
      this.editDialog = false;
      this.$store.dispatch("notification", {
        type: "success",
        value: true,
        title: "Картина отредактирована"
      });
    },
    onDelete() {
      this.$store
        .dispatch("deleteImage", {
          id: this.image.id
        })
        .then(() => {
          this.$store.dispatch("notification", {
            type: "success",
            value: true,
            title: "Картина удалена из галереи"
          });
          this.removeDialog = false;
          this.$router.push("/gallery");
        })
        .catch(() => {
          this.$store.dispatch("notification", {
            type: "error",
            value: true,
            title: "Картина не была удалена из галереи"
          });
          this.removeDialog = false;
        });
    }
  }
};
</script>
