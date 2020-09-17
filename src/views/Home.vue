<template>
  <div v-if="!loading">
    <v-container>
      <v-layout row>
        <v-col xs12>
          <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
            @change="changeSlider"
          >
            <router-link
              :aria-label="imageSlider.id"
              :to="'/gallery/' + imageSlider.id"
            >
              <v-carousel-item
                v-for="(slide, i) in newImages"
                :key="i"
                :src="slide.imageSrc"
              ></v-carousel-item>
            </router-link>
          </v-carousel>
        </v-col>
      </v-layout>
    </v-container>
    <v-container>
      <Gallery></Gallery>
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
import Gallery from "./Gallery";

export default {
  components: {
    Gallery
  },
  data() {
    return {
      imageSlider: {}
    };
  },
  computed: {
    images() {
      return this.$store.getters.images;
    },
    newImages() {
      return this.$store.getters.newImages;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  mounted() {
    this.$store.dispatch("setLoading", false);
  },
  methods: {
    changeSlider(i) {
      this.imageSlider = this.images[i];
    }
  }
};
</script>
