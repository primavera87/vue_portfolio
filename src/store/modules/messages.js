import * as fb from "firebase";

class Message {
  constructor(name, email, message, done = false, id = "") {
    this.name = name;
    this.email = email;
    this.message = message;
    this.done = done;
    this.id = id;
  }
}

export default {
  state: {
    messages: []
  },
  mutations: {
    loadMessage(state, payload) {
      state.messages = payload;
    },
    deleteMessage(state, { id }) {
      const idIndex = state.messages.find(a => {
        return a.id === id;
      });
      state.messages = state.messages.filter(item => item !== idIndex);
    }
  },
  actions: {
    async createMessage({ commit }, { name, email, message, done, id }) {
      const messag = new Message(name, email, message, done, id);
      commit("clearError");
      try {
        await fb
          .database()
          .ref(`/users/messages`)
          .push(messag);
      } catch (error) {
        commit("setError", error.message);
        throw error;
      }
    },
    async fetchMessages({ commit }) {
      commit("setLoading", true);
      commit("clearError");
      const resultMessages = [];

      try {
        const fbVal = await fb
          .database()
          .ref(`/users/messages`)
          .once("value");
        const messages = fbVal.val();

        Object.keys(messages).forEach(key => {
          const messag = messages[key];
          resultMessages.push(
            new Message(
              messag.name,
              messag.email,
              messag.message,
              messag.done,
              (messag.id = key)
            )
          );
          console.log(resultMessages);
          commit("loadMessage", resultMessages);
        });
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
      }
    },
    async deleteMessage({ commit }, { id }) {
      console.log(id);
      commit("clearError");
      commit("setLoading", true);
      console.log(fb.database().ref("/user/message"));
      try {
        await fb
          .database()
          .ref("/users/messages")
          .child(id)
          .remove();
        commit("deleteMessage", { id });
        commit("setLoading", false);
      } catch (error) {
        // commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    }
  },
  getters: {
    messages(state, getters) {
      // let i = 0;
      // const messages = [];
      // while (i <= 3) {
      //   messages.push(state.messages[i]);
      //   i++;
      // }
      return state.messages;
    },
    moreMessages(state, getters) {
      return state.messages;
    }
  }
};
