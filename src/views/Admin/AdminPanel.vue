<template>
  <v-container class="fill-height" fluid>
    <v-row align="start" justify="center">
      <v-col lg="6" sm="10" md="10" xs="4">
        <v-card class="elevation-12" min-width="350">
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                name="title"
                label="Название"
                type="text"
                required
                v-model="title"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="warning" @click="uploadImage">
              Загрузить Изображение
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              style="display: none;"
              accept="image/*"
              @change="onFileChange"
            />
          </v-card-actions>
          <v-row justify="space-around" class="pa-2">
            <v-col cols="12">
              <v-img v-if="imageSrc" :src="imageSrc" aspect-ratio="1.7"></v-img>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn
              :disabled="!valid || !title || !image || loading"
              color="success"
              block
              :loading="loading"
              @click="addImage"
            >
              Добавить
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col lg="6" sm="10" md="10" xs="4">
        <div v-if="!loading && messages.length !== 0">
          <h3>Сообщения</h3>
          <div v-for="(message, i) in messages" :key="i" class="mt-3">
            <v-card class="d-flex elevation-12" min-width="350">
              <v-card-text class="text--primary">
                <div>
                  <b>Имя:</b>
                  {{ message.name }}
                </div>
                <div>
                  <b>E-mail:</b>
                  {{ message.email }}
                </div>
                <div>
                  <b>Сообщение:</b>
                  {{ message.message }}
                </div>
              </v-card-text>
              <div
                class="deleteMessage"
                title="Удалить сообщение"
                @click="onDeleteMessage(message.id)"
              >
                X
              </div>
            </v-card>
          </div>
        </div>
        <div v-else class="text-center">
          <v-container>
            <v-layout row>
              <v-flex xs12>
                <v-progress-circular
                  indeterminate
                  :size="100"
                  :width="4"
                  color="purple"
                ></v-progress-circular>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
        <!--        <v-btn-->
        <!--          color="success"-->
        <!--          block-->
        <!--          class="mt-6"-->
        <!--          :loading="loading"-->
        <!--          @click="getMoreMessages"-->
        <!--        >-->
        <!--          Больше сообщений-->
        <!--          <v-icon right dark>mdi-cloud-upload</v-icon>-->
        <!--        </v-btn>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      valid: false,
      image: null,
      imageSrc: ""
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    messages() {
      return this.$store.getters.messages;
    }
  },
  created() {
    const isUserLoggedIn = this.$store.getters.isUserLoggedIn;
    if (!isUserLoggedIn) {
      this.$router.push("/");
    }
  },
  mounted() {
    this.$store.dispatch("fetchMessages").then(() => {
      this.$store.dispatch("setLoading", false);
    });
  },

  methods: {
    addImage() {
      if (this.$refs.form.validate() && this.image) {
        const image = {
          id: this.image.lastModified,
          title: this.title,
          description: this.description,
          image: this.image
        };
        try {
          this.$store.dispatch("createImage", image).then(() => {
            this.$refs.form.reset();
            this.imageSrc = "";

            this.$store.dispatch("notification", {
              type: "success",
              value: true,
              title: "Картина добавлена в галерею"
            });
          });
          // .then(() => {
          //   this.$router.push("/gallery");
          // });
        } catch (e) {
          this.$store.dispatch("notification", {
            type: "warning",
            value: true,
            title: "Картина не была добавлена"
          });
        }
      }
    },
    onDeleteMessage(id) {
      console.log(id);
      this.$store
        .dispatch("deleteMessage", {
          id: id
        })
        .then(() => {
          this.$store.dispatch("notification", {
            type: "success",
            value: true,
            title: "Сообщение удалено!"
          });
        })
        .catch(() => {
          this.$store.dispatch("notification", {
            type: "error",
            value: true,
            title: "Ошибка! Сообщение не было удалено."
          });
        });
    },
    uploadImage() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.image = file;
    },
    getMoreMessages() {
      this.messages = this.$store.getters.moreMessages;
    }
  }
};
</script>

<style>
.deleteMessage {
  cursor: pointer;
  width: 20px;
  height: 20px;
  padding: 0 5px;
  background-color: #cd5c5c;
}
</style>
