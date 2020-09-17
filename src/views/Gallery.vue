<template>
  <div v-if="!loading && images.length !== 0">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row align="center" justify="center">
            <v-card
              v-for="(image, i) in images"
              :key="i"
              class="ma-3 pa-2 elevation-12"
              width="350"
            >
              <router-link :aria-label="image.id" :to="'/gallery/' + image.id">
                <v-img
                  class="white--text align-end"
                  height="200px"
                  :loading="loading"
                  :src="image.imageSrc"
                >
                </v-img>
              </router-link>
              <v-card-text
                class="text--primary pa-2"
                align="center"
                justify="center"
              >
                <h3>{{ image.title }}</h3>
                <!--                <div>{{ image.description }}</div>-->
              </v-card-text>
            </v-card>
          </v-row>
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
export default {
  computed: {
    images() {
      return this.$store.getters.images;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  mounted() {
    this.$store.dispatch("setLoading", false);
  }
};
</script>
