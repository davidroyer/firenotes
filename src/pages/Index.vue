<template>
  <q-page class="flex flex-center">
    <h2 class="header q-header--bordered">QTron App</h2>
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" />
    <q-btn color="primary" label="Logout" @click="logout" />
  </q-page>
</template>

<script>
/* eslint-disable no-console */
import authService from "../../services/auth-service";
console.log("TCL: authService", authService);

export default {
  name: "PageIndex",

  methods: {
    async logout() {
      await authService.logout();
      alert("Logged out");
      this.$q.electron.remote.getCurrentWindow().close();
    }
  }
};
</script>

<style lang="sass">
.q-page
  flex-flow: row wrap

  .header
    width: 100%
    text-align: center
</style>
