<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="11">
          <v-row
            align="center"
            justify="space-between"
            class="mb-3 pl-3 pr-3"
            style="overflow-wrap: anywhere;"
          >
            <h2>{{ image.title }}</h2>
            <app-image-edit :image="image" @successHandler="successHandler"
              >Редактировать</app-image-edit
            >
          </v-row>
          <v-img
            :src="image.imageSrc"
            alt="image"
            class="grey lighten-2 mt-5"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
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
</template>

<script>
import ImageEdit from "./ImageEdit";

export default {
  props: ["id"],
  data() {
    return {
      success: false,
      warning: false
    };
  },
  components: {
    appImageEdit: ImageEdit
  },
  computed: {
    image() {
      const id = this.id;
      return this.$store.getters.imageById(id);
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    successHandler(val) {
      this.success = val;
    }
  }
};
</script>
