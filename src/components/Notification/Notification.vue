<template>
  <v-alert
    v-show="notification.value"
    class="notification"
    :type="notification.type"
    transition="scale-transition"
  >
    {{ notification.title }}
  </v-alert>
</template>

<script>
export default {
  computed: {
    notification() {
      return this.$store.getters.notification;
    }
  }
};
</script>
