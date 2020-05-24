<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="title">
          Стоп-лист
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="24">
        <ChangePhoneCard/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ChangePhoneCard from "../components/ChangePhoneCard";

  export default {
    name: "EditPage",
    components: {
      ChangePhoneCard,
    },
    data: () => ({
      breadcrumbs: [],
    }),
    created() {
      const tmp = this.$route.meta.breadCrumbs.slice();

      tmp.forEach((breadCrumb) => {
        if (breadCrumb.href === '/edit/') {
          breadCrumb.disabled = true;
        }
      });

      this.breadcrumbs = tmp;
    },
  }
</script>

<style scoped>

</style>
