import * as fb from "firebase";

class Image {
  constructor(id, title, description, imageSrc = "") {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageSrc = imageSrc;
  }
}

export default {
  state: {
    images: [],
    notification: {}
  },
  mutations: {
    createImage(state, payload) {
      state.images.push(payload);
    },
    loadImages(state, payload) {
      state.images = payload;
    },
    notification(state, payload) {
      state.notification = payload;
    },
    updateImage(state, { title, id }) {
      const image = state.images.find(a => {
        return a.id === id;
      });

      image.title = title;
    },
    deleteImage(state, { id }) {
      const idIndex = state.images.find(a => {
        return a.id === id;
      });
      state.images = state.images.filter(item => item !== idIndex);
    }
  },
  actions: {
    notification({ commit }, payload) {
      commit("notification", { ...payload });
      setTimeout(() => {
        commit("notification", false);
      }, 3000);
    },
    async createImage({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      const image = payload.image;

      try {
        const newImage = new Image(
          payload.id,
          payload.title,
          payload.description,
          ""
        );
        const images = await fb
          .database()
          .ref("images")
          .push(newImage);
        const imageExt = image.name.slice(image.name.lastIndexOf("."));
        const fileData = await fb
          .storage()
          .ref(`images/${image.lastModified}.${imageExt}`)
          .put(image);
        const imageSrc = await fb
          .storage()
          .ref()
          .child(fileData.ref.fullPath)
          .getDownloadURL();
        await fb
          .database()
          .ref("images")
          .child(images.key)
          .update({
            imageSrc
          });
        commit("setLoading", false);
        commit("createImage", {
          ...newImage,
          id: images.key,
          imageSrc
        });
      } catch (error) {
        // commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
      // commit("createImage", payload)
    },
    async fetchImages({ commit }) {
      commit("setLoading", true);
      commit("clearError");
      const resultImages = [];
      try {
        const imagesVal = await fb
          .database()
          .ref("images")
          .once("value");
        const images = imagesVal.val();
        Object.keys(images).forEach(key => {
          const image = images[key];

          resultImages.push(
            new Image(
              (image.id = key),
              images[key].title,
              images[key].description,
              images[key].imageSrc
            )
          );
          console.log(resultImages);
          commit("loadImages", resultImages);
          commit("setLoading", false);
        });
      } catch (error) {
        // commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    async updateImage({ commit }, { title, id }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        await fb
          .database()
          .ref("images")
          .child(id)
          .update({
            title
          });
        commit("updateImage", {
          id,
          title
        });
        commit("setLoading", false);
      } catch (error) {
        // commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    async deleteImage({ commit }, { id }) {
      console.log(id);
      commit("clearError");
      commit("setLoading", true);
      console.log(fb.database().ref("images"));
      try {
        await fb
          .database()
          .ref("images")
          .child(id)
          .remove();
        commit("deleteImage", { id });
        commit("setLoading", false);
      } catch (error) {
        // commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    }
  },
  getters: {
    images(state) {
      return state.images.reverse();
    },
    notification(state) {
      return state.notification;
    },
    newImages(state) {
      let i = 0;
      const images = [];
      while (i <= 4) {
        images.push(state.images[i]);
        i++;
      }
      return images;
    },
    imageById(state) {
      return imageId => {
        return state.images.find(image => image.id == imageId);
      };
    }
  }
};
