<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import List from "./components/List";

export default {
  name: 'App',
  components: {
    List
  },
  created() {
    this.$store.dispatch('GET_PHONES');
  },
};
</script>
